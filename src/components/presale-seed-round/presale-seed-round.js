import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import {
    isMobile
} from "react-device-detect";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";

class PresaleSeedRound extends React.Component {

    state = {
        isMobile: isMobile,
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,
        loginStatus: null,

        selectedCurrencyFrom: 'ETH',
        tokenAmount: '',

        tokenBalance: null,

        seedPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        },
        strategicPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        },
        publicPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        }
    }

    static propTypes = {
        metamaskConfiguration: PropTypes.any,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,
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

        await fetch("/localdb/funds-raising-status.json")
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                this.setState({
                    seedPresaleRound: {
                        tokenPriceText: json['seed-presale-round']['token-price-text'],
                        currentStatus: json['seed-presale-round']['current-status'],
                        status: json['seed-presale-round']['status'],
                        statusText: json['seed-presale-round']['status-text'],
                        raisedText: json['seed-presale-round']['raised-text']
                    },
                    strategicPresaleRound: {
                        tokenPriceText: json['strategic-presale-round']['token-price-text'],
                        currentStatus: json['strategic-presale-round']['current-status'],
                        status: json['strategic-presale-round']['status'],
                        statusText: json['strategic-presale-round']['status-text'],
                        raisedText: json['strategic-presale-round']['raised-text']
                    },
                    publicPresaleRound: {
                        tokenPriceText: json['public-presale-round']['token-price-text'],
                        currentStatus: json['public-presale-round']['current-status'],
                        status: json['public-presale-round']['status'],
                        statusText: json['public-presale-round']['status-text'],
                        raisedText: json['public-presale-round']['raised-text']
                    }
                })
            }).catch(reason => {

            })

        this.setState({
            isMobile: isMobile,
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
                if (chainId !== config.CHAINS.GOERLI.hex) { //goerli
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
                if (chainId !== config.CHAINS.GOERLI.hex) { //goerli
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
            <section className="presale-seed-round">
                <div className="header-section">
                    <div className="title">
                        Funds Raising Status
                    </div>
                </div>

                <p className="description">
                    Here, you can view real-time statistics ant participate in one of our three investment stages: the Seed Round, Strategic Round, and Public Sale Round.
                </p>

                <hr />

                <div className="main-section">
                    <div className="content">
                        <div className="message-status">
                            {this.state.seedPresaleRound.tokenPriceText}
                        </div>
                        <div className="current-status">
                            {this.state.seedPresaleRound.currentStatus}
                        </div>

                        <div className={"token-status " + this.state.seedPresaleRound.status}>
                            {this.state.seedPresaleRound.statusText}
                        </div>

                        <div className="raised">
                            {this.state.seedPresaleRound.raisedText}
                        </div>
                    </div>
                </div>

                <div className="main-section">
                    <div className="content">
                        <div className="message-status">
                            {this.state.strategicPresaleRound.tokenPriceText}
                        </div>
                        <div className="current-status">
                            <span>
                                {this.state.strategicPresaleRound.currentStatus}
                            </span>

                            <button type="button" className="btn unlock-proof-pass">
                                Unlock with Proof Pass
                            </button>
                        </div>

                        <div className={"token-status " + this.state.strategicPresaleRound.status}>
                            <span>
                                {this.state.strategicPresaleRound.statusText}
                            </span>
                            <button type="button" className="btn generate-whitelist-code">
                                Generate Whitelist Code
                            </button>
                        </div>

                        <div className="raised">
                            {this.state.strategicPresaleRound.raisedText}
                        </div>
                    </div>
                </div>

                <div className="main-section">
                    <div className="content">
                        {
                            (!this.state.isMobile && !this.state?.loginStatus && this.state.isMetaMaskSupported) &&
                            <button type="button" className="btn connect-wallet" onClick={(event) => {
                                this.loginMetaMask();
                            }}>
                                Connect Wallet
                            </button>
                        }
                        <div className="message-status">
                            {this.state.publicPresaleRound.tokenPriceText}
                        </div>
                        <div className="current-status">
                            <span>
                                {this.state.publicPresaleRound.currentStatus}
                            </span>

                        </div>

                        <div className={"token-status " + this.state.publicPresaleRound.status}>
                            <span>
                                {this.state.publicPresaleRound.statusText}
                            </span>
                        </div>

                        <div className="raised">
                            {this.state.publicPresaleRound.raisedText}
                        </div>
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(PresaleSeedRound));

export default hoc;