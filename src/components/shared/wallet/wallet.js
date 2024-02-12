
import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from "gatsby-plugin-react-intl";
import {
    isMobile
} from "react-device-detect";
import WalletCryptoCurrencyIcon from "../../currency-icon/wallet-crypto-currency-icon";

class Wallet extends React.Component {
    state = {
    }

    static propTypes = {
    }

    _isMounted = false;

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this._isMounted = true;


        window.addEventListener('resize', () => {
            this.setState({
                isMobile: isMobile
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {


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
                            1.12345678
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
                            1.12345678
                        </div>
                    </div>
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

    return {

    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Wallet));

export default hoc;