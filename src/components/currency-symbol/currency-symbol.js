import PropTypes from "prop-types"
import React from "react"

class CurrencySymbol extends React.Component {

    static propTypes = {
        currency: PropTypes.string,
        //will render currency symbol if true
        isSymbol: PropTypes.bool
    }

    static defaultProps = {
        currency: null,
        isSymbol: true
    }

    renderCurrency(currency) {
        if (this.props.isSymbol) {
            switch (currency) {
                case 'EUR':
                    return '€';
                case 'USD':
                    return '$';
                case 'GBP':
                    return '£';
                case 'DKK':
                    return 'kr';
                case 'CZK':
                    return 'Kč';
                case 'RSD':
                    return 'din.';
                case 'PLN':
                    return 'zł';
                case 'RUB':
                    return '₽';
                case 'BAM':
                    return 'KM';
                case 'ALL':
                    return 'Lek';
                default:
                    return currency;
            }
        } else {
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
