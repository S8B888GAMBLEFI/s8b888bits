
import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-react-intl"

class TransactionType extends React.Component {
    state = {

    }

    static propTypes = {
        transactionType: PropTypes.string.isRequired
    }

    render() {

        switch (this.props.transactionType) {
            case 'AFF_PL_TO': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO" });
            case 'AFF_PL_FROM': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_FROM" });
            case 'AFF_AFF_TO': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_AFF_TO" });
            case 'AFF_AFF_FROM': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_AFF_FROM" });
            case 'OLCT_HANG_PAY_OUT': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_OUT" });
            case 'OLCT_HANG_PAY_OUT_BO_VERIFIED': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_OUT_BO_VERIFIED" })
            case 'AFF_PL_TO_BILL': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO_BILL" })
            case 'AFF_PL_FROM_USB': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_FROM_USB" })
            case 'AFF_PL_TO_USB': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO_USB" })
            case 'AFF_WEB_PL_TO': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_TO" })
            case 'AFF_WEB_PL_TO_USB': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_TO_USB" })
            case 'AFF_WEB_PL_TO_BILL': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_TO_BILL" })
            case 'AFF_WEB_PL_FROM': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_FROM" })
            case 'AFF_PL_FROM_CODE': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_FROM_CODE" })
            case 'AFF_WEB_PL_FROM_MONEY': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_FROM_MONEY" })
            case 'AFF_WEB_PL_FROM_CODE': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_FROM_CODE" })
            case 'AFF_WEB_PL_FROM_USB': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_FROM_USB" })
            case 'AFF_PL_TO_BCR': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO_BCR" })
            case 'AFF_WEB_PL_TO_BCR': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_WEB_PL_TO_BCR" })
            case 'OLCT_HANG_PAY_IN': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_IN" })
            case 'PTEST IN': return this.props.intl.formatMessage({ id: "Transaction Types.PTEST IN" })
            case 'VISA IN': return this.props.intl.formatMessage({ id: "Transaction Types.VISA IN" })
            case 'MASTERCARD': return this.props.intl.formatMessage({ id: "Transaction Types.MASTERCARD" })
            case 'Maestro': return this.props.intl.formatMessage({ id: "Transaction Types.Maestro" })
            case 'Bank Transfer IN': return this.props.intl.formatMessage({ id: "Transaction Types.Bank Transfer IN" })
            case 'Paysafecard IN': return this.props.intl.formatMessage({ id: "Transaction Types.Paysafecard IN" })
            case 'Neteller IN': return this.props.intl.formatMessage({ id: "Transaction Types.Neteller IN" })
            case 'Skrill IN': return this.props.intl.formatMessage({ id: "Transaction Types.Skrill IN" })
            case 'UKASH IN': return this.props.intl.formatMessage({ id: "Transaction Types.UKASH IN" })
            case 'ECO CARD WALLET IN': return this.props.intl.formatMessage({ id: "Transaction Types.ECO CARD WALLET IN" })
            case 'PTEST OUT': return this.props.intl.formatMessage({ id: "Transaction Types.PTEST OUT" })
            case 'VISA OUT': return this.props.intl.formatMessage({ id: "Transaction Types.VISA OUT" })
            case 'Neteller OUT': return this.props.intl.formatMessage({ id: "Transaction Types.Neteller OUT" })
            case 'Skrill OUT': return this.props.intl.formatMessage({ id: "Transaction Types.Skrill OUT" })
            case 'UKASH OUT': return this.props.intl.formatMessage({ id: "Transaction Types.UKASH OUT" })
            case 'ECO CARD WALLET OUT': return this.props.intl.formatMessage({ id: "Transaction Types.ECO CARD WALLET OUT" })
            case 'CREDITS_TO_GGL': return this.props.intl.formatMessage({ id: "Transaction Types.CREDITS_TO_GGL" })
            case 'CREDITS_FROM_GGL': return this.props.intl.formatMessage({ id: "Transaction Types.CREDITS_FROM_GGL" })
            case 'CREDITS_TO_CBC': return this.props.intl.formatMessage({ id: "Transaction Types.CREDITS_TO_CBC" })
            case 'CREDITS_FROM_CBC': return this.props.intl.formatMessage({ id: "Transaction Types.CREDITS_FROM_CBC" })
            case 'BO_DEPOSIT': return this.props.intl.formatMessage({ id: "Transaction Types.BO_DEPOSIT" })
            case 'BO_WITHDRAW': return this.props.intl.formatMessage({ id: "Transaction Types.BO_WITHDRAW" })
            case 'AFF_PL_TO_VOUCHER': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO_VOUCHER" })
            case 'AFF_PL_TO_VOUCHER_PROMO': return this.props.intl.formatMessage({ id: "Transaction Types.AFF_PL_TO_VOUCHER_PROMO" })
            case 'BONUS_DEPOSIT': return this.props.intl.formatMessage({ id: "Transaction Types.BONUS_DEPOSIT" })
            case 'BONUS_CANCEL': return this.props.intl.formatMessage({ id: "Transaction Types.BONUS_CANCEL" })
            case 'BONUS_WIN_CANCEL': return this.props.intl.formatMessage({ id: "Transaction Types.BONUS_WIN_CANCEL" })
            case 'BONUS_WIN_EXPIRED': return this.props.intl.formatMessage({ id: "Transaction Types.BONUS_WIN_EXPIRED" })
            case 'BONUS_EXPIRED': return this.props.intl.formatMessage({ id: "Transaction Types.BONUS_EXPIRED" })
            case 'PROMOTION_DEPOSIT': return this.props.intl.formatMessage({ id: "Transaction Types.PROMOTION_DEPOSIT" })
            case 'PROMOTION_WIN_RESTRICTED_TO_CREDITS': return this.props.intl.formatMessage({ id: "Transaction Types.PROMOTION_WIN_RESTRICTED_TO_CREDITS" })
            case 'PROMOTION_EXPIRED': return this.props.intl.formatMessage({ id: "Transaction Types.PROMOTION_EXPIRED" })
            case 'DEPOSIT_FEE': return this.props.intl.formatMessage({ id: "Transaction Types.DEPOSIT_FEE" })
            case 'INACTIVITY_FEE': return this.props.intl.formatMessage({ id: "Transaction Types.INACTIVITY_FEE" })
            case 'DEPOSIT_OPTIONS': return this.props.intl.formatMessage({ id: "Transaction Types.DEPOSIT_OPTIONS" })
            case 'WITHDRAW_OPTIONS': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_OPTIONS" })
            case 'WITHDRAW_FEE_REQUEST_POSTPONE': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_FEE_REQUEST_POSTPONE" })
            case 'WITHDRAW_REQUEST_POSTPONE': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_REQUEST_POSTPONE" })
            case 'WITHDRAW_REQUEST': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_REQUEST" })
            case 'WITHDRAW_FEE_REQUEST': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_FEE_REQUEST" })
            case 'WITHDRAW_FEE_DECLINED_BANK': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_FEE_DECLINED_BANK" })
            case 'WITHDRAW_FEE_DECLINED': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_FEE_DECLINED" })
            case 'WITHDRAW_DECLINED_BANK': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_DECLINED_BANK" })
            case 'WITHDRAW_DECLINED': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_DECLINED" })
            case 'OLCT_HANG_PAY_OUT_FEE_BO_VERIFIED': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_OUT_FEE_BO_VERIFIED" })
            case 'OLCT_HANG_PAY_OUT_FEE_CANCEL': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_OUT_FEE_CANCEL" })
            case 'OLCT_HANG_PAY_OUT_FEE': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_PAY_OUT_FEE" })
            case 'WITHDRAW_FEE': return this.props.intl.formatMessage({ id: "Transaction Types.WITHDRAW_FEE" })
            case 'OLCT_HANG_CANCEL': return this.props.intl.formatMessage({ id: "Transaction Types.OLCT_HANG_CANCEL" })
            case 'GGL': return this.props.intl.formatMessage({ id: "Transaction Types.GGL" })
            case 'CBC': return this.props.intl.formatMessage({ id: "Transaction Types.CBC" })
            case 'START SHIFT': return this.props.intl.formatMessage({ id: "Transaction Types.START SHIFT" })
            case 'END SHIFT': return this.props.intl.formatMessage({ id: "Transaction Types.END SHIFT" })
            case 'PL_UPLOAD_DOC': return this.props.intl.formatMessage({ id: "Transaction Types.PL_UPLOAD_DOC" })
            case 'PL_DOC_VERIF': return this.props.intl.formatMessage({ id: "Transaction Types.PL_DOC_VERIF" })
            case 'PL_STATUS_VERIF': return this.props.intl.formatMessage({ id: "Transaction Types.PL_STATUS_VERIF" })
            case 'PROMOTION_CANCEL': return this.props.intl.formatMessage({ id: "Transaction Types.PROMOTION_CANCEL" })

            default:
                return this.props.transactionType;
        }
    }
}

const hoc = injectIntl(TransactionType);

export default hoc;