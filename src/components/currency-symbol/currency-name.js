import PropTypes from "prop-types"
import React from "react"

class CurrencySymbol extends React.Component {

    static propTypes = {
        currency: PropTypes.string,
    }

    static defaultProps = {
        currency: null
    }

    renderCurrency(currency) {
        switch (currency) {
            case 'USDTT':
                return 'TETHER TRON';
            case 'USDTE':
                return 'TETHER ETHEREUM';
            case 'ETH':
                return 'ETHEREUM';
            case 'BTC':
                return 'BITCOIN';
            case 'Doge':
                return 'DOGECOIN';
            case 'USD':
                return 'US DOLLAR';
            case 'EUR':
                return 'EURO';
            case 'LTC': case 'LTCT':
                return 'LITECOIN';
            case 'BCH':
                return 'BITCOIN CASH';
            case 'S8B':
                return 'S888B';
            default:
                return currency;
        }
    }


    render() {
        return (
            (this.props.currency) ? this.renderCurrency(this.props.currency) : null
        );
    }
}

export default CurrencySymbol;
