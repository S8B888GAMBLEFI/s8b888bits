
import React from "react";
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from "gatsby-plugin-react-intl";
import {
    isMobile
} from "react-device-detect";
import WalletCryptoCurrencyIcon from "../../currency-icon/wallet-crypto-currency-icon";
import { ethers } from "ethers";

class Wallet extends React.Component {

    state = {
        isMobile: isMobile,
        accountInformation: null,

        ethInUSD: 0
    }

    static propTypes = {
        session: PropTypes.any,
        metamaskConfiguration: PropTypes.any,
        accountInformation: PropTypes.object,
    }

    static defaultPropTypes = {
        session: null,
        accountInformation: null
    }

    _isMounted = false;

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount = async () => {
        this._isMounted = true;

        this.setState({
            accountInformation: this.props.accountInformation,
        });


        await fetch("/localdb/funds-raising-rounds.json")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    ethInUSD: json.ethInUSD
                })
            }).catch(reason => {

            })


        window.addEventListener('resize', () => {
            this.setState({
                isMobile: isMobile
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.accountInformation) !== JSON.stringify(prevProps.accountInformation)) {
            //console.log(this.props.accountInformation);
            this.setState({
                accountInformation: this.props.accountInformation || null
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shortUsername = (username) => {
        if (username && username.length === 42) {
            //return username.slice(0, 20) + "...";
            return username.slice(0, 8) + "..." + username.slice(username.length - 7, username.length);
        } else {
            return username;
        }
    }

    render() {
        return (

            <div className="wallet">
                <div className="title centered"><FormattedMessage id="Wallet" /></div>
                <div className="single-col">
                    <div className="col centered">
                        <div>
                            <WalletCryptoCurrencyIcon currency="ETH" width={40} height={40} />
                        </div>
                        <div className="account-balance">
                            Account Balance
                        </div>
                        <div className="account-balance-value">
                            {
                                this.state?.accountInformation?.balance &&
                                parseFloat(ethers.formatEther(this.state?.accountInformation?.balance)).toFixed(8)
                            }
                        </div>
                    </div>
                    <div className="col centered">
                        <div>
                            <WalletCryptoCurrencyIcon currency="USD" width={40} height={40} />
                        </div>
                        <div className="account-balance">
                            Value in USD
                        </div>
                        <div className="account-balance-value">
                            {
                                this.state?.accountInformation?.balance &&
                                ((ethers.formatEther(this.state?.accountInformation?.balance) * this.state.ethInUSD).toFixed(2))
                            }
                        </div>
                    </div>
                    {
                        this.state?.accountInformation?.stakeTokenBalance &&
                        <div className="col centered">
                            <div>
                                <WalletCryptoCurrencyIcon currency="S8B" width={40} height={40} />
                            </div>
                            <div className="account-balance">
                                Token Balance
                            </div>
                            <div className="account-balance-value">
                                {
                                    this.state?.accountInformation?.stakeTokenBalance &&
                                    this.state?.accountInformation?.stakeTokenBalance
                                }
                            </div>
                        </div>
                    }
                    {
                        this.state?.accountInformation?.rewardTokenBalance &&
                        <div className="col centered">
                            <div>
                                <WalletCryptoCurrencyIcon currency="S8B" width={40} height={40} />
                            </div>
                            <div className="account-balance">
                                Reward Collected
                            </div>
                            <div className="account-balance-value">
                                {
                                    this.state?.accountInformation?.rewardTokenBalance &&
                                    this.state?.accountInformation?.rewardTokenBalance
                                }
                            </div>
                        </div>
                    }
                    {
                        this.state?.accountInformation?.totalStakedBalance &&
                        <div className="col centered">
                            <div>
                                <WalletCryptoCurrencyIcon currency="S8B" width={40} height={40} />
                            </div>
                            <div className="account-balance">
                                Tokens Staked
                            </div>
                            <div className="account-balance-value">
                                {
                                    this.state?.accountInformation?.totalStakedBalance &&
                                    this.state?.accountInformation?.totalStakedBalance
                                }
                            </div>
                        </div>
                    }
                    {
                        this.state?.accountInformation?.rewardsStakedBalance &&
                        <div className="col centered">
                            <div>
                                <WalletCryptoCurrencyIcon currency="S8B" width={40} height={40} />
                            </div>
                            <div className="account-balance">
                                Reward to claim
                            </div>
                            <div className="account-balance-value">
                                {
                                    this.state?.accountInformation?.rewardsStakedBalance &&
                                    this.state?.accountInformation?.rewardsStakedBalance
                                }
                            </div>
                        </div>
                    }
                    <div className="col centered">
                        <button className="btn deposit-tab" onClick={(event) => {

                        }}>
                            Deposit
                        </button>
                    </div>
                    <div className="col centered">
                        <button className="btn withdraw-tab" onClick={(event) => {

                        }}>
                            Withdraw
                        </button>
                    </div>
                </div>
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

    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Wallet));

export default hoc;