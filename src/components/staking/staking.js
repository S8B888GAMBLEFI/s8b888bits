import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedNumber } from "gatsby-plugin-react-intl"
import BalanceCryptoCurrencyIcon from "../currency-icon/balance-crypto-currency-icon";
import CurrencyName from "../currency-symbol/currency-name";
import BuyTokens from "../buy-tokens/buy-tokens";
import TransactionTypeStatus from "../transaction_type/transaction-type-status";
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

        dailyApr: null,
        apr: null,

        ethInUSD: null

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

        if (provider) {
            isMetaMaskSupported = (typeof window && typeof window.ethereum !== 'undefined') && window?.ethereum?.isMetaMask;
        }

        let metamaskConfiguration = null;
        if (this.props?.metamaskConfiguration) {
            metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
        }

        await fetch("/localdb/funds-raising-rounds.json")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ethInUSD: json.ethInUSD
                })
            }).catch(reason => {

            })

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,
            accounts: metamaskConfiguration?.accounts || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),
        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                window.ethereum.on('chainChanged', this.chainChanged);
            }
            this.refreshData();
            this.refreshInterval = setInterval(() => this.refreshData(), 10000);
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
                this.accountsChanged();
                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                    window.ethereum.on('chainChanged', this.chainChanged);
                }
            });
        }

        if (JSON.stringify(this.props.accountInformation) !== JSON.stringify(prevProps.accountInformation)) {
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

                let playerAddress = accounts[0];

                let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })

                await stakeTokenContract.methods.balanceOf(playerAddress)
                    .call({
                        from: playerAddress
                    })
                    .then((response) => {
                        //console.log("STAKE TOKEN BALANCE: " + response);
                        this.setState({
                            stakeTokenBalance: ethers.formatEther(response)
                        })
                        this.props.setAccountInformationAction({
                            ...this.props.accountInformation,
                            accounts: accounts,
                            stakeTokenBalance: ethers.formatEther(response)
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    ;


                let rewardTokenContract = new this.state.web3Instance.eth.Contract(REWARD_TOKEN_ABI, REWARD_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })

                await rewardTokenContract.methods.balanceOf(playerAddress)
                    .call({
                        from: playerAddress
                    })
                    .then((response) => {
                        //console.log("REWARD TOKEN BALANCE: " + response);
                        this.setState({
                            rewardTokenBalance: ethers.formatEther(response) //this.formatBalance(response)
                        })
                        this.props.setAccountInformationAction({
                            ...this.props.accountInformation,
                            rewardTokenBalance: ethers.formatEther(response)
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    ;


                let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: playerAddress, gas: 10000000 })

                await stakeContract.methods.getStakeInfo(playerAddress)
                    .call({
                        from: playerAddress
                    })
                    .then((response) => {
                        //console.log(response);
                        //_tokensStaked, _rewards
                        this.setState({
                            totalStakedBalance: ethers.formatEther(response._tokensStaked), //this.formatBalance(response._tokensStaked)
                            rewardsStakedBalance: ethers.formatEther(response._rewards),
                        })
                        this.props.setAccountInformationAction({
                            ...this.props.accountInformation,
                            totalStakedBalance: ethers.formatEther(response._tokensStaked),
                            rewardsStakedBalance: ethers.formatEther(response._rewards),
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    ;
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
            if (config.ENVIRONMENT_SITE === "LIVE") {
                if (chainId !== config.CHAINS.MAINNET.hex) { //if not main eth network
                    try {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.MAINNET.hex.toString()
                                }
                            ]
                        });
                    } catch (error) {
                        return;
                    }
                }
            }

            if (config.ENVIRONMENT_SITE === "LOCAL") {
                if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia
                    try {

                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.SEPOLIA.hex.toString()
                                }
                            ]
                        });

                    } catch (error) {
                        return;
                    }
                }
            }

            if (config.ENVIRONMENT_SITE === "DEV") {
                if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia
                    try {

                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.SEPOLIA.hex.toString()
                                }
                            ]
                        });

                    } catch (error) {
                        return;
                    }
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
        if (!this.state.web3Instance) {
            return;
        }

        let playerAddress = this.state.accounts[0];

        let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })

        stakeTokenContract.methods.balanceOf(playerAddress)
            .call({
                from: playerAddress
            })
            .then((response) => {
                //console.log("STAKE TOKEN BALANCE: " + response);
                this.setState({
                    stakeTokenBalance: ethers.formatEther(response)
                });

                if (this.props?.accountInformation) {
                    this.props.setAccountInformationAction({
                        ...this.props.accountInformation,
                        stakeTokenBalance: ethers.formatEther(response)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
            ;

        let rewardTokenContract = new this.state.web3Instance.eth.Contract(REWARD_TOKEN_ABI, REWARD_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })

        rewardTokenContract.methods.balanceOf(playerAddress)
            .call({
                from: playerAddress
            })
            .then((response) => {
                //console.log("REWARD TOKEN BALANCE: " + response);
                this.setState({
                    rewardTokenBalance: ethers.formatEther(response) //this.formatBalance(response)
                });

                if (this.props?.accountInformation) {
                    this.props.setAccountInformationAction({
                        ...this.props.accountInformation,
                        rewardTokenBalance: ethers.formatEther(response)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
            ;

        let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: this.playerAddress, gas: 10000000 })

        stakeContract.methods.getStakeInfo(playerAddress)
            .call({
                from: playerAddress
            })
            .then((response) => {
                //console.log(response);
                //_tokensStaked, _rewards
                let apr = ((ethers.formatEther(response._rewards) / ethers.formatEther(response._tokensStaked)) * 100) + "";

                apr = apr + "";

                apr = apr.substring(0, apr.indexOf(".") + 3);

                //console.log(apr);

                this.setState({
                    totalStakedBalance: ethers.formatEther(response._tokensStaked),
                    rewardsStakedBalance: ethers.formatEther(response._rewards),
                    dailyApr: apr,
                    apr: apr,
                });

                if (this.props?.accountInformation) {
                    this.props.setAccountInformationAction({
                        ...this.props.accountInformation,
                        totalStakedBalance: ethers.formatEther(response._tokensStaked),
                        rewardsStakedBalance: ethers.formatEther(response._rewards),
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
            ;
    }

    render = () => {
        return (
            <section className="staking-section">

                <div className="header-section">
                    <div className="title">
                        <img src="/pictures/image-icons/bank-line.svg" width="24" height="24" alt="Bank" />
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
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
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
                            />
                            )
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
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
                            />
                            )
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            Daily APR
                        </span>
                        <span className="balance">
                            {
                                this.state.dailyApr &&
                                <>
                                    {this.state.dailyApr} %
                                </>
                            }
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            APR
                        </span>
                        <span className="balance">
                            {
                                this.state.apr &&
                                <>
                                    {this.state.apr} %
                                </>
                            }
                        </span>
                    </div>
                </div>

                <hr />

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

                                this.setState({
                                    stakeAmount: this.state.stakeTokenBalance
                                }, () => {
                                    this.refreshData();
                                });

                            }}>
                                Stake Max
                            </button>
                            <button type="button" className="btn approve" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.stakeAmount) return;

                                let playerAddress = this.state.accounts[0];
                                let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })
                                let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: playerAddress, gas: 10000000 })

                                //console.log(this.state.stakeAmount);
                                //console.log(playerAddress);
                                //console.log(stakeTokenContract);

                                await stakeTokenContract.methods.approve(STAKE_CONTRACT_ADDRESSES, ethers.parseEther(this.state.stakeAmount))
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    });

                                //console.log(stakeContract);

                                await stakeContract.methods.stake(ethers.parseUnits(this.state.stakeAmount, "ether"))
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    });

                                this.refreshData();

                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn claim" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.rewardsStakedBalance) return;

                                let playerAddress = this.state.accounts[0];
                                //let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })
                                let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: playerAddress, gas: 10000000 })

                                await stakeContract.methods.claimRewards()
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    });

                                this.refreshData();
                            }}>
                                Claim
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

                                this.setState({
                                    unstakeAmount: this.state.totalStakedBalance
                                });

                            }}>
                                Unstake Max
                            </button>
                            <button type="button" className="btn approve" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.unstakeAmount) return;

                                let playerAddress = this.state.accounts[0];
                                //let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })
                                let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: playerAddress, gas: 10000000 })

                                await stakeContract.methods.withdraw(ethers.parseUnits(this.state.unstakeAmount, "ether"))
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    });

                                this.refreshData();

                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn claim" onClick={async (event) => {
                                event.preventDefault();

                                if (!this.state.rewardsStakedBalance) return;

                                let playerAddress = this.state.accounts[0];
                                //let stakeTokenContract = new this.state.web3Instance.eth.Contract(STAKE_TOKEN_ABI, STAKE_TOKEN_ADDRESSES, { from: playerAddress, gas: 10000000 })
                                let stakeContract = new this.state.web3Instance.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES, { from: playerAddress, gas: 10000000 })

                                await stakeContract.methods.claimRewards()
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    });

                                this.refreshData();

                            }}>
                                Claim
                            </button>
                        </div>
                    </div>
                </div>

                <hr />

                <BuyTokens />

                <hr />

                <div className="recent-activities">
                    <div className="title">
                        Recent Activities
                    </div>

                    <div className="block-recent-activities">
                        <table className="table-recent-activities">
                            <thead>
                                <tr>
                                    <th>
                                        Coin
                                    </th>
                                    <th>
                                        Transaction
                                    </th>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Fees
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="BTC" />
                                    </td>
                                    <td>
                                        <div className="amount">$659.10</div>
                                        <div className="transaction-type">Withdraw BTC</div>
                                    </td>
                                    <td>
                                        #14525156
                                    </td>
                                    <td>
                                        Mar 21, 2022
                                    </td>
                                    <td>
                                        <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="USDT" />
                                    </td>
                                    <td>
                                        <div className="amount">$659.10</div>
                                        <div className="transaction-type">Withdraw USDT</div>
                                    </td>
                                    <td>
                                        #14525156
                                    </td>
                                    <td>
                                        Mar 21, 2022
                                    </td>
                                    <td>
                                        <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="USDTT" />
                                    </td>
                                    <td>
                                        <div className="amount">$659.10</div>
                                        <div className="transaction-type">Withdraw USDTT</div>
                                    </td>
                                    <td>
                                        #14525156
                                    </td>
                                    <td>
                                        Mar 21, 2022
                                    </td>
                                    <td>
                                        <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="ETH" />
                                    </td>
                                    <td>
                                        <div className="amount">$659.10</div>
                                        <div className="transaction-type">Withdraw ETH</div>
                                    </td>
                                    <td>
                                        #14525156
                                    </td>
                                    <td>
                                        Mar 21, 2022
                                    </td>
                                    <td>
                                        <TransactionTypeStatus transactionType="WITHDRAW_REQUEST" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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