
import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-react-intl"

class TransactionTypeStatus extends React.Component {
    state = {

    }

    static propTypes = {
        transactionType: PropTypes.string.isRequired
    }


    render() {

        switch (this.props.transactionType) {
            case 'AFF_PL_TO':
            case 'AFF_PL_FROM':
            case 'AFF_AFF_TO':
            case 'AFF_AFF_FROM':
            case 'OLCT_HANG_PAY_OUT':
            case 'OLCT_HANG_PAY_OUT_BO_VERIFIED':
            case 'AFF_PL_TO_BILL':
            case 'AFF_PL_FROM_USB':
            case 'AFF_PL_TO_USB':
            case 'AFF_WEB_PL_TO':
            case 'AFF_WEB_PL_TO_USB':
            case 'AFF_WEB_PL_TO_BILL':
            case 'AFF_WEB_PL_FROM':
            case 'AFF_PL_FROM_CODE':
            case 'AFF_WEB_PL_FROM_MONEY':
            case 'AFF_WEB_PL_FROM_CODE':
            case 'AFF_WEB_PL_FROM_USB':
            case 'AFF_PL_TO_BCR':
            case 'AFF_WEB_PL_TO_BCR':
            case 'OLCT_HANG_PAY_IN':
            case 'PTEST IN':
            case 'VISA IN':
            case 'MASTERCARD':
            case 'Maestro':
            case 'Bank Transfer IN':
            case 'Paysafecard IN':
            case 'Neteller IN':
            case 'Skrill IN':
            case 'UKASH IN':
            case 'ECO CARD WALLET IN':
            case 'PTEST OUT':
            case 'VISA OUT':
            case 'Neteller OUT':
            case 'Skrill OUT':
            case 'UKASH OUT':
            case 'ECO CARD WALLET OUT':
            case 'CREDITS_TO_GGL':
            case 'CREDITS_FROM_GGL':
            case 'CREDITS_TO_CBC':
            case 'CREDITS_FROM_CBC':
            case 'BO_DEPOSIT':
            case 'BO_WITHDRAW':
            case 'AFF_PL_TO_VOUCHER':
            case 'AFF_PL_TO_VOUCHER_PROMO':
            case 'BONUS_DEPOSIT':
            case 'BONUS_WIN_EXPIRED':
            case 'BONUS_EXPIRED':
            case 'PROMOTION_DEPOSIT':
            case 'PROMOTION_WIN_RESTRICTED_TO_CREDITS':
            case 'PROMOTION_EXPIRED':
            case 'DEPOSIT_FEE':
            case 'INACTIVITY_FEE':
            case 'DEPOSIT_OPTIONS':
            case 'WITHDRAW_OPTIONS':
            case 'OLCT_HANG_PAY_OUT_FEE_BO_VERIFIED':
            case 'OLCT_HANG_PAY_OUT_FEE':
            case 'WITHDRAW_FEE':
            //case 'OLCT_HANG_CANCEL':
            case 'GGL':
            case 'CBC':
            case 'START SHIFT':
            case 'END SHIFT':
            case 'PL_UPLOAD_DOC':
            case 'PL_DOC_VERIF':
            case 'PL_STATUS_VERIF':
            case 'CryptoCurrency':
                return (
                    <div className="completed">
                        Completed
                    </div>);


            //case 'BONUS_CANCEL':
            //case 'BONUS_WIN_CANCEL':
            case 'WITHDRAW_FEE_DECLINED_BANK':
            case 'WITHDRAW_FEE_DECLINED':
            case 'WITHDRAW_DECLINED_BANK':
            case 'WITHDRAW_DECLINED':
                //case 'OLCT_HANG_PAY_OUT_FEE_CANCEL':
                //case 'PROMOTION_CANCEL':
                return (
                    <div className="declined">
                        Declined
                    </div>);

            case 'WITHDRAW_FEE_REQUEST_POSTPONE':
            case 'WITHDRAW_REQUEST_POSTPONE':
            case 'WITHDRAW_REQUEST':
            case 'WITHDRAW_FEE_REQUEST':
                return (
                    <div className="pending">
                        Pending
                    </div>);

            case 'OLCT_HANG_CANCEL':
            case 'BONUS_CANCEL':
            case 'BONUS_WIN_CANCEL':
            case 'OLCT_HANG_PAY_OUT_FEE_CANCEL':
            case 'PROMOTION_CANCEL':
                return (
                    <div className="canceled">
                        Canceled
                    </div>
                )

            default:
                return (
                    <div>
                        {this.props.transactionType}
                    </div>
                )
        }
    }
}

const hoc = injectIntl(TransactionTypeStatus);

export default hoc;