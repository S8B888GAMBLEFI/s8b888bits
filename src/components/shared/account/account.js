import React from "react";
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import * as config from "../../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
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
        metamaskConfiguration: PropTypes.any,
        accountInformation: PropTypes.object,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,
    }

    static defaultPropTypes = {
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
            /*if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                window.ethereum.on('chainChanged', this.chainChanged);
            }*/
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.accountInformation) !== JSON.stringify(prevProps.accountInformation)) {
            this.setState({
                accountInformation: this.props.accountInformation
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

    render = () => {
        return (
            <div className="account">
                <div className="title centered">
                    Account
                </div>
                {
                    !this.state?.accountInformation &&
                    <div className="single-col">
                        <div className="col centered">
                            <div className="message">
                                Please login
                            </div>
                        </div>
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
                    </div>
                }
                {
                    this.state?.accountInformation &&
                    <div className="single-col">
                        <div className="col centered">
                            <img src="/pictures/account/dashboard/profile-default.svg" alt="Profile" loading="lazy" />
                        </div>
                        <div className="col centered">
                            <div className="username">
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
                    </div>
                }
            </div>
        )
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
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Account));

export default hoc;