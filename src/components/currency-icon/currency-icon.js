import React from "react"
import PropTypes from "prop-types"

class CurrencyIcon extends React.Component {

    static propTypes = {
        currency: PropTypes.string
    }

    static defaultProps = {
        currency: null
    }

    render() {
        switch (this.props.currency) {
            case 'LTC': case 'LTCT':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-litcoin.svg" alt="" />;
            case 'ETH':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-ethereum.svg" alt="" />;
            case 'BTC': case 'mBTC':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-bitcoin.svg" alt="" />;
            case 'USDT':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-usdt.svg" alt="" />;
            case 'USDTE':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-usdt.svg" alt="" />;
            case 'USDTT':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-usdtt.svg" alt="" />;
            case 'BCH':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-bitcoin-cash.svg" alt="" />;
            case 'EUR':
                //return <img src="/pictures/icon-crypto-euro.svg" alt="" />;
                return <img loading="lazy" decoding="async" src="/pictures/icon-euro.svg" alt="" />;
            case 'XMR':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-monero.svg" alt="" />;
            case 'DOGE':
                return <img loading="lazy" decoding="async" src="/pictures/icon-crypto-dodge.svg" alt="" />;
            case 'USD':
                return <img loading="lazy" decoding="async" src="/pictures/icon-usd.svg" alt="" />;
            case 'SOL':
                return <img loading="lazy" decoding="async" src="/pictures/icon-sol.svg" alt="" />;
            default:
                return null;
        }
    }
}

export default CurrencyIcon;
