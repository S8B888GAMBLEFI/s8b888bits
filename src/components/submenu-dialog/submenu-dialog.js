
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from "gatsby-plugin-react-intl";
import { setSubmenuDialogStatusAction, deleteSubmenuDialogStatusAction } from "../../redux/actions/submenuDialog/SubmenuDialogActions";

import Clock from "./parts/clock";
import moment from "moment";
import * as config from "../../configuration/Config";

class SubmenuDialog extends React.Component {
    state = {
        submenuDialogStatus: {},
        currentDate: moment().format("MM/DD/YYYY")
    }

    static propTypes = {
        submenuDialogStatus: PropTypes.object,

        setSubmenuDialogStatusAction: PropTypes.func,
        deleteSubmenuDialogStatusAction: PropTypes.func,
    }

    static defaultPropTypes = {

    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        this.setState({
            submenuDialogStatus: this.props.submenuDialogStatus,
            currentDate: moment().format("MM/DD/YYYY")
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.submenuDialogStatus) !== JSON.stringify(this.props.submenuDialogStatus)) {
            if (this._isMounted) {
                this.setState({
                    submenuDialogStatus: this.props.submenuDialogStatus
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className={this.state?.submenuDialogStatus?.status && this.state.submenuDialogStatus.status === "OPEN" ? "modal-outer visible" : "modal-outer"} id="submenu-desk">

                <div className="modal-content-wide">
                    <div className="modal-content">
                        <div className="page-nav">
                            <div className="col">
                                <p className="title">
                                    <FormattedMessage id="About" />
                                </p>
                                <ul>
                                    <li>
                                        <a title="Company" href={config.CASINO_BASE_URL + "about/company/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Company" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Bonuses and promotions" href={config.CASINO_BASE_URL + "promo/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Bonuses and promotions" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Fairness and RNG Testing Methods" href={config.CASINO_BASE_URL + "about/fairness-and-rng-testing-methods/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Fairness and RNG Testing Methods" />
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://docs.888bits.com/" title="S8B GambleFi" onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="S8B GambleFi" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Anti-Money Laundering Policy" href={config.CASINO_BASE_URL + "resources/aml-policy/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Anti-Money Laundering Policy" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Privacy and Management Policy" href={config.CASINO_BASE_URL + "resources/privacy-policy/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Privacy and Management Policy" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col">
                                <p className="title">
                                    <FormattedMessage id="Terms and Policies" />
                                </p>
                                <ul>
                                    <li>
                                        <a title="Gaming Terms and Conditions" href={config.CASINO_BASE_URL + "about/terms-and-conditions/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Gaming Terms and Conditions" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Player Account and Bonus Conditions" href={config.CASINO_BASE_URL + "about/player-account/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Player Account and Bonus Conditions" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="Responsible Gambling Agreement" href={config.CASINO_BASE_URL + "resources/responsible-gaming/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Responsible Gambling Agreement" />
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Self-Exclusion Policy" href={config.CASINO_BASE_URL + "resources/self-exclusion/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Self-Exclusion Policy" />
                                        </a>
                                    </li>
                                    <li>
                                        <a title="Dispute and Complaint Policy" href={config.CASINO_BASE_URL + "resources/support-and-complaints/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="Dispute and Complaint Policy" />
                                        </a>
                                    </li>

                                    <li>
                                        <a title="KYC Policy" href={config.CASINO_BASE_URL + "resources/kyc-policy/"} onClick={(event) => {
                                            this.props.deleteSubmenuDialogStatusAction();
                                        }}>
                                            <FormattedMessage id="KYC Policy" />
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="modal-secondary-outer">
                            <p className="title">
                                <FormattedMessage id="Follow us" />
                            </p>
                            <ul className="social-menu">
                                <li>
                                    <a href="https://t.me/Official888bits" target={"_blank"} onClick={(event) => {
                                        this.props.deleteSubmenuDialogStatusAction();
                                    }}>
                                        <img src="/pictures/image-icons/icon-telegram.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/S8B888BITS" target={"_blank"} onClick={(event) => {
                                        this.props.deleteSubmenuDialogStatusAction();
                                    }}>
                                        <img src="/pictures/image-icons/icon-x.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                                    </a>
                                </li>
                                <li>
                                    <button type="button" onClick={(event) => {
                                        if (window?.tidioChatApi) {
                                            event.preventDefault();
                                            window.tidioChatApi.show();
                                            window.tidioChatApi.open();
                                        }
                                        this.props.deleteSubmenuDialogStatusAction();
                                    }}>
                                        <img src="/pictures/image-icons/icon-support.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                                    </button>
                                </li>
                            </ul>
                            <p>
                                <FormattedMessage id="Current Casino Time" /> <br />
                                <strong>
                                    {this.state.currentDate}
                                    &nbsp;
                                    <Clock />
                                </strong>
                            </p>
                        </div>
                        <button type="button" className="modal-close" onClick={
                            (event) => {
                                event.preventDefault();
                                this.props.deleteSubmenuDialogStatusAction();
                            }
                        }></button>
                    </div>
                </div>
                <div className="modal-bgr" onClick={
                    (event) => {
                        this.props.deleteSubmenuDialogStatusAction();
                    }
                }></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { submenuDialogStatus } = state.submenuDialogStatus;

    return { submenuDialogStatus };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setSubmenuDialogStatusAction,
        deleteSubmenuDialogStatusAction,

        //setAuthenticatedPlayerDialogStatusAction,
        //deleteAuthenticatedPlayerDialogStatusAction,
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SubmenuDialog));

export default hoc;