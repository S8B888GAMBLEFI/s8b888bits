import React from "react";
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    isMobile
} from "react-device-detect";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { injectIntl, FormattedNumber } from "gatsby-plugin-react-intl"
import moment from "moment-timezone";
import BalanceCryptoCurrencyIcon from "../currency-icon/balance-crypto-currency-icon";
import TransactionTypeStatus from "../transaction_type/transaction-type-status";
import { getNormalTransactionsByAddress } from "../../redux/services/EtherscanService";
import { ethers } from "ethers";
import * as config from "../../configuration/Config";

class RecentActivities extends React.Component {

    state = {
        isMobile: isMobile,

        isMetaMaskSupported: null,
        isPhantomSupported: null,
        loginStatus: null,
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,


        report: null,
    }

    static propTypes = {
        session: PropTypes.any,
        metamaskConfiguration: PropTypes.any,
        submenuDialogStatus: PropTypes.object,
        accountInformation: PropTypes.object,
    }

    componentDidMount = async () => {

        let provider = await detectEthereumProvider({ silent: true })
        //console.log(provider);
        let isMetaMaskSupported = false;
        let isPhantomSupported = false;

        if (provider && provider === window.ethereum) {
            isMetaMaskSupported = true;
            isPhantomSupported = false;
        }

        /*
        isPhantomSupported = window.phantom?.solana?.isPhantom;

        if (isPhantomSupported) {
            isMetaMaskSupported = false;
        }

        if (isPhantomSupported) {
            if ('phantom' in window) {
                provider = window.phantom?.solana;
            }
        }
        */

        let metamaskConfiguration = null;
        if (this.props?.metamaskConfiguration) {
            metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
        }

        this.setState({
            isMobile: isMobile,

            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,
            isPhantomSupported: isPhantomSupported,

            accounts: metamaskConfiguration?.accounts || null,
            balance: metamaskConfiguration?.balance || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),

        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                /*
                if (this.state.isMetaMaskSupported) {
                    window.ethereum.on('accountsChanged', this.metaMaskAccountsChanged);
                    window.ethereum.on('chainChanged', this.metaMaskChainChanged)
                }
                if (this.state.isPhantomSupported) {
                    window.ethereum.on('accountsChanged', this.phantomAccountsChanged);
                    //window.ethereum.on('chainChanged', this.phantomChainChanged)
                }
                */

                getNormalTransactionsByAddress(this.state.accounts[0])
                    .then((response) => {
                        //console.log(response);
                        this.setState({
                            report: response.result
                        })
                    })
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
                accounts: metamaskConfiguration?.accounts || null,
                balance: metamaskConfiguration?.balance || null,
                loginStatus: metamaskConfiguration?.loginStatus || null,
                chainId: metamaskConfiguration?.chainId || null,
                report: null,

            }, () => {
                /*if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                }*/

                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    getNormalTransactionsByAddress(this.state.accounts[0])
                        .then((response) => {
                            //console.log(response);
                            this.setState({
                                report: response.result
                            })
                        })
                }
            });
        }
    }

    render = () => {
        return (
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
                            {/*
                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="BTC" width={32} height={32} />
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
                                    <BalanceCryptoCurrencyIcon currency="USDT" width={32} height={32} />
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
                                    <TransactionTypeStatus transactionType="WITHDRAW_DECLINED" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="USDTT" width={32} height={32} />
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
                                    <TransactionTypeStatus transactionType="BONUS_CANCEL" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="ETH" width={32} height={32} />
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
                            */}
                            {
                                this.state?.report && this.state.report.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <BalanceCryptoCurrencyIcon currency="ETH" width={32} height={32} />
                                            </td>
                                            <td>
                                                <div className="amount">
                                                    <FormattedNumber value={ethers.formatUnits(value.value)}
                                                        minimumFractionDigits={2}
                                                        maximumFractionDigits={config.getMinimumFractionDigits("ETH")}
                                                        style="decimal"
                                                    />
                                                </div>
                                                <div className="transaction-type">{value.functionName}</div>
                                            </td>
                                            <td>
                                                <a href={config.ETHERSCAN_URL + "/tx/" + value.hash} target="_blank" rel="noreferrer">
                                                    {value.hash.substr(0, 11)}...
                                                </a>
                                            </td>
                                            <td>
                                                {moment.unix(value.timeStamp).tz("Europe/Berlin").format("MMM DD, YYYY HH:mm z")}
                                            </td>
                                            <td>
                                                {
                                                    value.txreceipt_status === "1" ?
                                                        <TransactionTypeStatus transactionType="COMPLETED" />
                                                        :
                                                        <TransactionTypeStatus transactionType="PENDING" />
                                                }

                                                {
                                                    value.isError === "1" ?
                                                        <TransactionTypeStatus transactionType="ERROR" />
                                                        :
                                                        null
                                                }

                                            </td>
                                            <td align="right">
                                                <FormattedNumber value={ethers.formatUnits((value.gasPrice * value.gasUsed))}
                                                    minimumFractionDigits={2}
                                                    maximumFractionDigits={config.getMinimumFractionDigits("ETH")}
                                                    style="decimal"
                                                />
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    const { session } = state.session;
    const { metamaskConfiguration } = state.metamaskConfiguration;
    const { submenuDialogStatus } = state.submenuDialogStatus;
    const { accountInformation } = state.accountInformation;

    return {
        session,
        metamaskConfiguration,
        submenuDialogStatus,
        accountInformation
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecentActivities));

export default hoc;