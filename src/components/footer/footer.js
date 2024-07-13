import React from "react";
import PropTypes from "prop-types";
import { Link, changeLocale, injectIntl, FormattedMessage } from "gatsby-plugin-react-intl";
import * as config from "../../configuration/Config";
import Clock from "./parts/clock";
import moment from "moment";
import WalletCryptoCurrencyIcon from "../currency-icon/wallet-crypto-currency-icon";

class Footer extends React.Component {

  state = {
    showLanguageMenu: false,
    currentDate: moment().format("MM/DD/YYYY")
  }

  static propTypes = {
    siteTitle: PropTypes.string,
    casinoName: PropTypes.string
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      showLanguageMenu: false,
      currentDate: moment().format("MM/DD/YYYY")
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleLanguageMenu = (event) => {
    if (this._isMounted) {
      this.setState(
        {
          showLanguageMenu: !this.state.showLanguageMenu
        }
      );
    }
  }

  changeLanguage = (language) => {
    if (this._isMounted) {
      this.setState(
        {
          showLanguageMenu: !this.state.showLanguageMenu
        }
      );
    }

    changeLocale(language, "");
  }

  render() {
    return (
      <footer>

        <div className="footer-wrapper block">

          <div className="footer-cols">

            <div className="col">
              <div className="page-nav">
                <div className="col-narrow">

                  <Link to="/" className="logo" title={config.casinoName}>
                    <img src="/pictures/logo/888logoPrimary.svg" alt={config.casinoName} loading="lazy" decoding="async" />
                  </Link>

                  <ul className="social-menu">
                    <li>
                      <a href="https://t.me/Official888bits" aria-label="Telegram" target={"_blank"}>
                        <img src="/pictures/image-icons/icon-telegram.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/S8B888BITS" aria-label="X (Twitter)" target={"_blank"}>
                        <img src="/pictures/image-icons/icon-x.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Support" target={"_blank"} onClick={(event) => {
                        if (window?.tidioChatApi) {
                          event.preventDefault();
                          window.tidioChatApi.show();
                          window.tidioChatApi.open();
                        }
                      }}>
                        <img src="/pictures/image-icons/icon-support.svg" alt="Telegram" width="50" height="50" loading="lazy" decoding="async" />
                      </a>
                    </li>
                  </ul>

                  <div className="casino-gamblefied-experience">
                    <div>
                      <WalletCryptoCurrencyIcon currency="S8B" />
                    </div>
                    <div>
                      S8B Gamblefied Casino Experience
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="col">

              <div className="page-nav">
                <div className="col">
                  <p className="title">
                    <FormattedMessage id="About" />
                  </p>
                  <ul>
                    <li>
                      <a href={config.CASINO_BASE_URL + "about/company/"} title="Company">
                        <FormattedMessage id="Company" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "promo/"} title="Bonuses and promotions">
                        <FormattedMessage id="Bonuses and promotions" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "about/fairness-and-rng-testing-methods/"} title="Fairness and RNG Testing Methods">
                        <FormattedMessage id="Fairness and RNG Testing Methods" />
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.888bits.com/" target="_blank" rel="noreferrer" title="S8B GambleFi">
                        <FormattedMessage id="S8B GambleFi" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/aml-policy/"} title="Anti-Money Laundering Policy">
                        <FormattedMessage id="Anti-Money Laundering Policy" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/privacy-policy/"} title="Privacy and Management Policy">
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
                      <a href={config.CASINO_BASE_URL + "about/terms-and-conditions/"} title="Gaming Terms and Conditions">
                        <FormattedMessage id="Gaming Terms and Conditions" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "about/player-account/"} title="Player Account and Bonus Conditions">
                        <FormattedMessage id="Player Account and Bonus Conditions" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/responsible-gaming/"} title="Responsible Gambling Agreement">
                        <FormattedMessage id="Responsible Gambling Agreement" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/self-exclusion/"} title="Self-Exclusion Policy">
                        <FormattedMessage id="Self-Exclusion Policy" />
                      </a>
                    </li>
                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/support-and-complaints/"} title="Dispute and Complaint Policy">
                        <FormattedMessage id="Dispute and Complaint Policy" />
                      </a>
                    </li>

                    <li>
                      <a href={config.CASINO_BASE_URL + "resources/kyc-policy/"} title="KYC Policy">
                        <FormattedMessage id="KYC Policy" />
                      </a>
                    </li>

                  </ul>
                </div>
              </div>

            </div>

            <div className="col">

              <p className="title">
                <FormattedMessage id="Info" />
              </p>

              <p className="casino-time">
                <img src="/pictures/image-icons/time-icon.svg" alt="Current casino time" loading="lazy" decoding="async" />
                &nbsp;&nbsp;
                <Clock />
              </p>

              <p className="casino-date">
                <img src="/pictures/image-icons/calendar-icon.svg" alt="Current casino date" loading="lazy" decoding="async" />
                &nbsp;&nbsp;
                {this.state.currentDate}
              </p>

            </div>

          </div>

          <hr />

          <div className="footer-cols">

            <div className="col-40">

            </div>
            <div className="col-40">
              <p className="company-name">
                &copy; {moment().year()} 888BITS a SmartBits BV Gaming Solutions
              </p>
            </div>
          </div>

          <hr />

        </div>

        <div className="footer-wrapper">

          {/*
            config.ENVIRONMENT_SITE === "LIVE" &&
            <p className="casino-license">
              <a href="https://verification.curacao-egaming.com/validateview.aspx?domain=888bits.com" target="_blank">
                <img src="https://verification.curacao-egaming.com/validate.ashx?domain=888bits.com" alt="" width="100" />
              </a>
              <br />
            </p>
          */}
          <p className="description-1">
            Website 888BITS.COM is operated by SmartBits B.V., registration number 157320, at Pareraweg 45, Willemstad, Curaçao, license no. 1668/JAZ.
            <br />
            Spilux Enterprises ltd is a subsidiary of SmartBits B.V., registered in Cyprus at address 5 Galinis, Office 101, 1048 Nicosia,
            Cyprus with registration number is HE 431701.
            <br />
            Spilux Enterprises ltd act as payment agent of SmartBits B.V. and It is the player’s sole responsibility to
            inquire about the existing laws and regulations of the given jurisdiction for online gambling.
          </p>

          <p className="description-2">
            In order to register for this website, the user is required to accept the <a href={config.CASINO_BASE_URL + "about/terms-and-conditions/"}>General Terms and Conditions</a>.
            <br />
            In the event the General Terms and Conditions are updated,  existing users may choose to discontinue using the products and services before the said update shall become effective,
            <br />
            which is a minimum of two weeks after it has been announced.
          </p>

          <p className="small app-version">
            App ver. {config.APP_VERSION}
          </p>
        </div>

      </footer>
    );
  }
}

const hoc = injectIntl(Footer);

export default hoc;