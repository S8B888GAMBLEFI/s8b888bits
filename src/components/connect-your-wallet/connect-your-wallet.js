import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";

import WalletCryptoCurrencyIcon from "../currency-icon/wallet-crypto-currency-icon";


class ConnectYourWallet extends React.Component {

    state = {
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,
        loginStatus: null,
    }

    static propTypes = {
        metamaskConfiguration: PropTypes.any,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setSubmenuDialogStatusAction: PropTypes.func,
        deleteSubmenuDialogStatusAction: PropTypes.func,
    }

    static defaultProps = {

    }

    async componentDidMount() {
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

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,

            accounts: metamaskConfiguration?.accounts || null,
            balance: metamaskConfiguration?.balance || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),

        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                window.ethereum.on('chainChanged', this.chainChanged)
            }
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.metamaskConfiguration) !== JSON.stringify(prevProps.metamaskConfiguration)) {
            let metamaskConfiguration = null;
            if (this.props?.metamaskConfiguration) {
                metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
            }

            this.setState({
                //provider: provider,
                //isMetaMaskSupported: isMetaMaskSupported,

                accounts: metamaskConfiguration?.accounts || null,
                balance: metamaskConfiguration?.balance || null,
                loginStatus: metamaskConfiguration?.loginStatus || null,
                chainId: metamaskConfiguration?.chainId || null,

            }, () => {
                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                    window.ethereum.on('chainChanged', this.chainChanged)
                }
            });
        }
    }

    loginMetaMask = async () => {
        let chainId = null;
        try {
            chainId = await window.ethereum.request({
                method: "eth_chainId",
                params: []
            })

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
                if (chainId !== config.CHAINS.GOERLI.hex) { //sepolia
                    try {

                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.GOERLI.hex.toString()
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
        } catch (error) {
            return;
        }

        try {
            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            let web3Instance = new Web3(window.ethereum);

            let balance = null;
            try {

                await web3Instance.eth.getAccounts().then(async (result) => {
                    accounts = result;

                    balance = await window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [accounts[0], "latest"]
                    });
                })

            } catch (error) {
                console.error(error);
                return;
            }

            let loginStatus = accounts.length > 0;


            let metamaskConfigurationJSON = JSON.stringify(
                {
                    accounts: accounts,
                    balance: balance,
                    loginStatus: loginStatus,
                    chainId: chainId,
                }
            );

            //console.log(metamaskConfigurationJSON);

            this.setState({
                accounts: accounts,
                loginStatus: loginStatus,
                web3Instance: web3Instance,
                balance: balance,
                chainId: chainId,
            }, () => {
                this.props.setMetamaskConfigurationAction(metamaskConfigurationJSON);

                window.ethereum.on('accountsChanged', this.accountsChanged);
                window.ethereum.on('chainChanged', this.chainChanged)
            })
        } catch (error) {

            if (error.code === 4001) {
                alert(error.message);
            } else {
                console.error(error);
            }
            return;
        }

    }

    chainChanged = async (accounts) => {
        //console.log("call chainChanged");
        let chainId = null;
        try {
            chainId = await window.ethereum.request({
                method: "eth_chainId",
                params: []
            })
        } catch (error) {

        }
        //console.log(chainId);
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
                if (chainId !== config.CHAINS.GOERLI.hex) { //sepolia
                    try {

                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.GOERLI.hex.toString()
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


    accountsChanged = (accounts) => {
        //console.log("call accountsChanged");

        this.refreshAccounts(accounts);
    }

    refreshAccounts = async (accounts) => {
        //console.log("call refreshAccounts");

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
                    }
                })
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    render = () => {
        return (
            <section className="connect-your-wallet">
                <div className="header-section">
                    <div className="title">
                        Connect your wallet
                    </div>
                    {
                        (!this.state?.loginStatus && this.state.isMetaMaskSupported) &&
                        <button type="button" className="btn connect-wallet" onClick={(event) => {
                            this.loginMetaMask();
                        }}>
                            Connect Wallet
                        </button>
                    }
                </div>
                <hr />
                <div className="main-section">
                    <div className="sale-price">
                        Private sale price: 1 $S8B = $0.0004
                    </div>
                    <div className="message">
                        Amount of currency you investing
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="ETH" width={30} height={30} />
                                <div className="name">
                                    ETH
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount"></input>
                            </div>
                        </div>

                        <div className="enter-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDT" width={30} height={30} />
                                <div className="name">
                                    USDT
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount"></input>
                            </div>
                        </div>

                        <div className="enter-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDC" width={30} height={30} />
                                <div className="name">
                                    USDC
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount"></input>
                            </div>
                        </div>
                    </div>

                    <div className="message">
                        Amount of $S8B you investing
                    </div>

                    <div className="receive-currency-section">
                        <div className="enter-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="S8B" width={30} height={30} />
                                <div className="name">
                                    S8B
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Amount to receive"></input>
                            </div>
                        </div>
                    </div>

                    <div className="listing-price">
                        Listing price: 1$S8B = $0.005
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {

    const { metamaskConfiguration } = state.metamaskConfiguration;

    return {
        metamaskConfiguration,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setMetamaskConfigurationAction,
        deleteMetamaskConfigurationAction,
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ConnectYourWallet));

export default hoc;