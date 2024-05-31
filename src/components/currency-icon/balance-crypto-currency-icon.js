import React from "react"
import PropTypes from "prop-types"

class BalanceCryptoCurrencyIcon extends React.Component {

    static propTypes = {
        currency: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number
    }

    static defaultProps = {
        currency: null,
        width: 50,
        height: 50
    }

    render() {
        switch (this.props.currency) {
            case 'LTC': case 'LTCT':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-ltc.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'ETH':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-eth.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'BTC': case 'mBTC':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-btc.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'USDT':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-usdt.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'USDTE':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-usdt.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'USDTT':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-usdtt.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'BCH':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-bch.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'EUR':
                //return <img src="/pictures/icon-crypto-euro.svg" alt="" />;
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-eur.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            /*case 'XMR':
                return <img loading="lazy" src="/pictures/icon-crypto-monero.svg" alt={this.props.currency} />;*/
            case 'DOGE':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-doge.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'USD':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-usd.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'USDC':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-usdc.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            case 'S8B':
                return <img loading="lazy" decoding="async" src="/pictures/balance-crypto-currencies/icon-s8b.svg" alt={this.props.currency} width={this.props.width} height={this.props.height} />;
            default:
                return this.props.currency;
        }
    }
}

export default BalanceCryptoCurrencyIcon;
