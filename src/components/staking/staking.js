import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedNumber } from "gatsby-plugin-react-intl"
import BalanceCryptoCurrencyIcon from "../currency-icon/balance-crypto-currency-icon";
import CurrencyName from "../currency-symbol/currency-name";
//import BuyTokens from "../buy-tokens/buy-tokens";
//import TransactionTypeStatus from "../transaction_type/transaction-type-status";
//import StrategicRoundBuyTokens from "../strategic-round-buy-tokens/strategic-round-buy-tokens";
import RecentActivities from "../recent-activities/recent-activities";
import Web3 from "web3";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
import { setAccountInformationAction, deleteAccountInformationAction } from "../../redux/actions/accountInformation/AccountInformationActions";
import { STAKE_TOKEN_ADDRESSES, STAKE_TOKEN_ABI, REWARD_TOKEN_ABI, REWARD_TOKEN_ADDRESSES, STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES } from "../../configuration/Config";
import { ethers } from "ethers";
class Staking extends React.Component {

    state = {
        provider: null,
        web3Instance: null,
        accounts: null,
        chainId: null,
        loginStatus: null,

        balance: null,

        accountInformation: null,

        stakeTokenBalance: null,
        rewardTokenBalance: null,

        totalStakedBalance: null,
        rewardsStakedBalance: null,

        stakeAmount: null,
        unstakeAmount: null,

        dailyApr: 0,
        apr: 0,

        ethInUSD: 0

    }

    static propTypes = {
        metamaskConfiguration: PropTypes.any,
        accountInformation: PropTypes.object,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setAccountInformationAction: PropTypes.func,
        deleteAccountInformationAction: PropTypes.func,
    }

    static defaultPropTypes = {
        accountInformation: null
    }

    refStakeAmount = null;
    refUnstakeAmount = null;
    refreshInterval = null;

    constructor(props, context) {
        super(props, context);

        this.refStakeAmount = React.createRef();
        this.refUnstakeAmount = React.createRef();
    }

    componentDidMount = async () => {
        const provider = await detectEthereumProvider({ silent: true })
        //console.log(provider);
        let isMetaMaskSupported = false;

        /*if (provider) {
            isMetaMaskSupported = (typeof window && typeof window.ethereum !== 'undefined') && window?.ethereum?.isMetaMask;
        }*/
        if (provider && provider === window.ethereum) {
            isMetaMaskSupported = true;
        }

        let metamaskConfiguration = null;
        if (this.props?.metamaskConfiguration) {
            metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
        }

        let ethInUSD = 0;

        /*
        await fetch("/localdb/funds-raising-rounds.json")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ethInUSD: json.ethInUSD
                })
            }).catch(reason => {

            })
        */

        await fetch(config.API_BASE_URL + "get-exchange-pair/fromCurrency/ETH/toCurrency/USD")
            .then(response => response.json())
            .then(json => {
                ethInUSD = json.rate;
            }).catch(reason => {

            });

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,
            accounts: metamaskConfiguration?.accounts || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),
            accountInformation: this.props.accountInformation,
            ethInUSD: ethInUSD
        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                //window.ethereum.on('chainChanged', this.chainChanged);
            }
            this.refreshData();
            //this.refreshInterval = setInterval(() => this.refreshData(), 10000);
        });

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (JSON.stringify(this.props.metamaskConfiguration) !== JSON.stringify(prevProps.metamaskConfiguration)) {
            let metamaskConfiguration = null;
            if (this.props?.metamaskConfiguration) {
                metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
            }

            this.setState({
                accounts: metamaskConfiguration?.accounts || null,
                balance: metamaskConfiguration?.balance || null,
                loginStatus: metamaskConfiguration?.loginStatus || null,
                chainId: metamaskConfiguration?.chainId || null,

            }, () => {
                //this.accountsChanged();
                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                    //window.ethereum.on('chainChanged', this.chainChanged);
                }
                this.refreshData();
                //this.refreshInterval = setInterval(() => this.refreshData(), 10000);
            });
        }

        if (JSON.stringify(this.props.accountInformation) !== JSON.stringify(prevProps.accountInformation)) {
            if (!this.props?.accountInformation || this.props.accountInformation === null) {
                this.setState({
                    accountInformation: null,
                    accounts: null,
                    chainId: null,
                    loginStatus: null,

                    balance: null,

                    stakeTokenBalance: null,
                    rewardTokenBalance: null,

                    totalStakedBalance: null,
                    rewardsStakedBalance: null,

                    apr: null,
                    dailyApr: null,
                }, () => {
                    clearInterval(this.refreshInterval);
                });
            }
            else {
                this.setState({
                    accountInformation: this.props.accountInformation || null
                }, () => {
                    //console.log(this.props.accountInformation);
                    if (!this.state?.accountInformation) {
                        clearInterval(this.refreshInterval);
                    }
                })
            }
        }
    }

    accountsChanged = async () => {
        await this.refreshAccounts(this.state.accounts);
    }

    refreshAccounts = async (accounts) => {

        //console.log("refreshAccounts");
        //console.log(accounts);

        try {
            if (this.state.web3Instance?.eth) {
                await this.state.web3Instance.eth.getAccounts().then(async (result) => {
                    if (result && result.length > 0) {
                        //console.log(result[0]);
                        const balance = await window.ethereum.request({
                            method: 'eth_getBalance',
                            params: [result[0], "latest"]
                        });
                        this.setState({
                            accounts: result,
                            balance: balance,//this.formatBalance(balance)
                        })
                        if (!this.state?.accountInformation) {
                            this.props.setAccountInformationAction({
                                ...this.props.accountInformation,
                                accounts: result,
                                balance: balance,
                            })
                        }
                    }
                })

                if (!accounts || accounts.length === 0) {
                    this.setState({
                        accounts: null,
                        chainId: null,
                        loginStatus: null,

                        balance: null,

                        stakeTokenBalance: null,
                        rewardTokenBalance: null,

                        totalStakedBalance: null,
                        rewardsStakedBalance: null,

                        apr: null,
                        dailyApr: null,
                    }, () => {
                        this.props.deleteAccountInformationAction();
                    });
                    return;
                }

            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    chainChanged = async (accounts) => {

        //console.log("chainChanged");

        let chainId = null;
        try {
            chainId = await window.ethereum.request({
                method: "eth_chainId",
                params: []
            })
        } catch (error) {

        }
        try {

            if (chainId !== config.CHAINS[config.DEFAULT_CHAIN].hex) { //if not default eth network for configuration
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [
                            {
                                chainId: config.CHAINS[config.DEFAULT_CHAIN].hex.toString()
                            }
                        ]
                    });
                } catch (error) {
                    return;
                }
            }

            let web3Instance = new Web3(window.ethereum);

            this.setState({
                web3Instance: web3Instance,
                chainId: chainId,
            }, () => {
                this.refreshAccounts(accounts);
            })
        } catch (error) {

        }
    }

    formatBalance = (rawBalance) => {
        if (!this.state?.web3Instance) return;
        //const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(config.getMinimumFractionDigits("ETH"))
        if (rawBalance === 0) return "0.00";
        if (rawBalance === 0n) return "0.00";
        if (rawBalance === "0") return "0.00";
        if (rawBalance === "0x0") return "0.00";
        const balance = this.state.web3Instance.utils.fromWei(rawBalance, 'ether');
        return balance;
    }

    refreshData = () => {

        if (!this.state?.accounts) {
            return;
        }
        if (!this.state?.accountInformation) {
            return;
        }
        if (!this.state?.web3Instance) {
            return;
        }

    }

    render = () => {
        return (
            <section className="staking-section">

                <div className="header-section">
                    <div className="title">
                        <img src="/pictures/image-icons/bank-line.svg" width="24" height="24" alt="Bank" loading="lazy" decoding="async" />
                        &nbsp;&nbsp;
                        $S8B Staking
                    </div>

                    <hr />

                    <div className="description">
                        Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                    </div>
                </div>

                <hr />

                <div className="balance-and-statistics">
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" loading="lazy" decoding="async" />
                        <span className="description">
                            Balance
                        </span>
                        <span className="balance">
                            <FormattedNumber value={this.state.stakeTokenBalance}
                                locale={this.props.intl.locale}
                                minimumFractionDigits={2}
                                maximumFractionDigits={config.getMinimumFractionDigits("S8B")}
                                style="decimal"
                            /> $S8B
                            ($
                            <FormattedNumber value={(this.state.stakeTokenBalance * this.state.ethInUSD)}
                                locale={this.props.intl.locale}
                                minimumFractionDigits={2}
                                maximumFractionDigits={config.getMinimumFractionDigits("USD")}
                                style="decimal"
                            />)
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" loading="lazy" decoding="async" />
                        <span className="description">
                            Total Staked
                        </span>
                        <span className="balance">
                            <FormattedNumber value={this.state.totalStakedBalance}
                                locale={this.props.intl.locale}
                                minimumFractionDigits={2}
                                maximumFractionDigits={config.getMinimumFractionDigits("S8B")}
                                style="decimal"
                            /> $S8B
                            ($
                            <FormattedNumber value={(this.state.totalStakedBalance * this.state.ethInUSD)}
                                locale={this.props.intl.locale}
                                minimumFractionDigits={2}
                                maximumFractionDigits={config.getMinimumFractionDigits("USD")}
                                style="decimal"
                            />)
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" loading="lazy" decoding="async" />
                        <span className="description">
                            Daily APR
                        </span>
                        <span className="balance">
                            {
                                <>
                                    {this.state.dailyApr} %
                                </>
                            }
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" loading="lazy" decoding="async" />
                        <span className="description">
                            APR
                        </span>
                        <span className="balance">
                            {
                                <>
                                    {this.state.apr} %
                                </>
                            }
                        </span>
                    </div>
                </div>

                <div className="stake-and-unstake">
                    <div className="stake">
                        <div className="title">
                            Stake
                        </div>
                        <p className="description">
                            {/*
                            Stake: {this.state.stakeTokenBalance} <br />
                            Reward: {this.state.rewardTokenBalance} <br />
                            Total Staked: {this.state.totalStakedBalance} <br />
                            Rewards Staked: {this.state.rewardsStakedBalance} <br />
                            */}
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                        </p>

                        <div className="stake-amount">
                            <div className="currency-container">
                                <div className="currency-box">
                                    {
                                        <BalanceCryptoCurrencyIcon currency="S8B" width={35} height={35} />
                                    }
                                    {
                                        <CurrencyName currency="S8B" />
                                    }
                                </div>
                            </div>
                            <input type="number" className="amount" placeholder="Enter Stake Amount"
                                maxLength={10}
                                autoComplete="new-password"
                                min="0.0000001"
                                step="0.0000001"
                                defaultValue={this.state.stakeAmount}
                                ref={this.refStakeAmount}
                                onChange={(event) => {
                                    this.setState({
                                        stakeAmount: event.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="button-actions">

                            <button type="button" className="btn stake-max" onClick={(event) => {
                                event.preventDefault();

                                if (!this.state.stakeTokenBalance) return;

                            }}>
                                Stake Max
                            </button>
                            <button type="button" className="btn approve" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.stakeAmount) return;

                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn stake-details" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.rewardsStakedBalance) return;

                            }}>
                                Details
                            </button>
                        </div>
                    </div>
                    <div className="unstake">
                        <div className="title">
                            Unstake
                        </div>
                        <p className="description">
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                        </p>

                        <div className="stake-amount">
                            <div className="currency-container">
                                <div className="currency-box">
                                    {
                                        <BalanceCryptoCurrencyIcon currency="S8B" width={35} height={35} />
                                    }
                                    {
                                        <CurrencyName currency="S8B" />
                                    }
                                </div>
                            </div>

                            <input type="number" className="amount" placeholder="Enter Unstake Amount"
                                maxLength={10}
                                autoComplete="new-password"
                                min="0.0000001"
                                step="0.0000001"
                                defaultValue={this.state.unstakeAmount}
                                ref={this.refUnstakeAmount}
                                onChange={(event) => {
                                    this.setState({
                                        unstakeAmount: event.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="button-actions">

                            <button type="button" className="btn stake-max" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.totalStakedBalance) return;

                            }}>
                                Unstake Max
                            </button>
                            <button type="button" className="btn approve" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.unstakeAmount) return;

                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn unstake-details" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.rewardsStakedBalance) return;

                            }}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>

                <hr />

                <RecentActivities />

            </section >
        );
    }
}

const mapStateToProps = state => {

    const { metamaskConfiguration } = state.metamaskConfiguration;
    const { accountInformation } = state.accountInformation;

    return {
        metamaskConfiguration,
        accountInformation
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setMetamaskConfigurationAction,
        deleteMetamaskConfigurationAction,

        setAccountInformationAction,
        deleteAccountInformationAction
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Staking));

export default hoc;