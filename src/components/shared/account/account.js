import React from "react";
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import * as config from "../../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
import { setAccountInformationAction, deleteAccountInformationAction } from "../../../redux/actions/accountInformation/AccountInformationActions";
import { ethers } from "ethers";

class Account extends React.Component {

    state = {
        provider: null,
        web3Instance: null,
        accounts: null,
        chainId: null,
        loginStatus: null,

        accountInformation: null,
    }

    static propTypes = {
        session: PropTypes.any,
        metamaskConfiguration: PropTypes.any,
        accountInformation: PropTypes.object,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setAccountInformationAction: PropTypes.func,
        deleteAccountInformationAction: PropTypes.func,
    }

    static defaultPropTypes = {
        session: null,
        accountInformation: null
    }

    constructor(props, context) {
        super(props, context);


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

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,
            accounts: metamaskConfiguration?.accounts || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),
            accountInformation: this.props.accountInformation,
        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                //window.ethereum.on('chainChanged', this.chainChanged);
            }
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.accountInformation) !== JSON.stringify(prevProps.accountInformation)) {
            this.setState({
                accountInformation: this.props.accountInformation || null
            })
        }
    }

    componentWillUnmount() {

    }

    shortUsername = (username) => {
        if (username && username.length === 42) {
            //return username.slice(0, 20) + "...";
            return username.slice(0, 8) + "..." + username.slice(username.length - 7, username.length);
        } else {
            return username;
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
                    }, () => {
                    });
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    render = () => {
        return (
            <div className="account">
                <div className="title centered">
                    Account
                </div>
                {
                    !this.props?.session?.loginStatus &&
                    <div className="single-col">
                        <div className="col centered">
                            <div className="message">
                                Please login
                            </div>
                        </div>
                        {/*
                        <div className="col centered">
                            <button type="button" className="btn login">
                                Log In
                            </button>
                        </div>
                        <div className="col centered">
                            <div className="message">
                                or
                            </div>
                        </div>
                        <div className="col centered">
                            <button type="button" className="btn signup">
                                Sign Up
                            </button>
                        </div>
                        */}
                        <div className="col centered">
                            <button type="button" className="btn add-token" onClick={async (event) => {
                                await window.ethereum.request({
                                    method: "wallet_watchAsset",
                                    params: {
                                        type: "ERC20",
                                        options: {
                                            address: "0xaCf7501e653f127345Df1a4EacdF663FCB1DF292",
                                            symbol: "S8TEST",
                                            decimals: 5,
                                            image: config.BASE_URL + "/pictures/wallet-crypto-currencies/icon-s8b.svg",
                                        }
                                    }
                                });
                            }}>
                                Add Token
                            </button>
                        </div>
                    </div>
                }
                {
                    this.props?.session?.loginStatus &&
                    <div className="single-col">
                        <div className="col centered">
                            <img src="/pictures/account/dashboard/profile-default.svg" alt="Profile" loading="lazy" />
                        </div>
                        <div className="col centered">
                            <div className="username" title={this.state?.accountInformation?.accounts[0]}>
                                {
                                    this.state?.accountInformation?.accounts &&
                                    this.shortUsername(this.state?.accountInformation?.accounts[0])
                                }
                            </div>
                        </div>

                        <div className="col centered">
                            <div className="balance">
                                {
                                    this.state?.accountInformation?.balance &&
                                    parseFloat(ethers.formatEther(this.state?.accountInformation?.balance)).toFixed(8)
                                } ETH
                            </div>
                        </div>

                        {
                            config.ENVIRONMENT_SITE === "DEV" &&
                            <div className="col centered">
                                <button type="button" className="btn add-token" onClick={async (event) => {
                                    await window.ethereum.request({
                                        method: "wallet_watchAsset",
                                        params: {
                                            type: "ERC20",
                                            options: {
                                                address: config.TOKEN_ADDRESSES[config.DEFAULT_CHAIN].S8TEST,
                                                symbol: "S8TEST",
                                                decimals: 5,
                                                image: config.BASE_URL + "/pictures/wallet-crypto-currencies/icon-s8b.svg",
                                            }
                                        }
                                    });
                                }}>
                                    Add Token
                                </button>
                            </div>
                        }
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {

    const { session } = state.session;
    const { metamaskConfiguration } = state.metamaskConfiguration;
    const { accountInformation } = state.accountInformation;

    return {
        session,
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Account));

export default hoc;