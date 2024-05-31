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
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25 50C38.8104 50 50 38.8104 50 25C50 11.1896 38.8104 0 25 0C11.1896 0 0 11.1896 0 25C0 38.8104 11.1896 50 25 50ZM11.4396 24.4583L35.5438 15.1646C36.6625 14.7604 37.6396 15.4375 37.2771 17.1292L37.2792 17.1271L33.175 36.4625C32.8708 37.8333 32.0562 38.1667 30.9167 37.5208L24.6667 32.9146L21.6521 35.8187C21.3187 36.1521 21.0375 36.4333 20.3917 36.4333L20.8354 30.0729L32.4187 19.6083C32.9229 19.1646 32.3062 18.9146 31.6417 19.3563L17.3271 28.3687L11.1562 26.4437C9.81667 26.0187 9.7875 25.1042 11.4396 24.4583Z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/BITS888" aria-label="Twitter" target={"_blank"}>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25 0C11.1937 0 0 11.1937 0 25C0 38.8062 11.1937 50 25 50C38.8062 50 50 38.8062 50 25C50 11.1937 38.8062 0 25 0ZM37.6375 20.0938C38.0187 28.5104 31.7417 37.8937 20.6292 37.8937C17.25 37.8937 14.1062 36.9021 11.4583 35.2042C14.6333 35.5792 17.8021 34.6958 20.3167 32.7271C17.7 32.6792 15.4896 30.9479 14.725 28.5708C15.6646 28.75 16.5896 28.6979 17.4292 28.4687C14.5521 27.8896 12.5646 25.2979 12.6292 22.525C13.4375 22.9729 14.3583 23.2417 15.3396 23.2729C12.675 21.4917 11.9208 17.9729 13.4875 15.2833C16.4375 18.9042 20.8479 21.2854 25.8208 21.5354C24.9479 17.7937 27.7875 14.1875 31.6521 14.1875C33.3708 14.1875 34.9271 14.9146 36.0187 16.0771C37.3812 15.8104 38.6646 15.3104 39.8188 14.625C39.3708 16.0229 38.4229 17.1937 37.1875 17.9354C38.3979 17.7896 39.5521 17.4687 40.6229 16.9917C39.8229 18.1958 38.8104 19.25 37.6375 20.0938V20.0938Z" />
                        </svg>
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
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.01667 39.5833H6.25C4.59167 39.5833 3.00208 38.925 1.83125 37.7521C0.658333 36.5812 0 34.9917 0 33.3333V27.0833C0 12.1354 11.2021 0 25 0C38.7979 0 50 12.1354 50 27.0833V33.3333C50 34.9917 49.3417 36.5812 48.1687 37.7521C46.9979 38.925 45.4083 39.5833 43.75 39.5833H41.9833C36.3792 49.2354 27.6 50 25 50C22.4 50 13.6208 49.2354 8.01667 39.5833ZM41.6667 27.3417C40.4146 27.8333 39.0229 26.9667 39.0229 25.6812C39.0229 25.0479 38.9771 24.4104 38.9125 23.775C35.2437 23.2458 31.375 19.7625 31.2062 16.0187C28.4667 20.1958 21.7792 24.7062 16.5312 24.7062C18.7937 23.25 20.3625 18.9292 20.4958 17.3979C19.2854 19.6729 14.4583 23.9312 11.0146 24.6625L10.9771 25.6812C10.9771 26.9708 9.58333 27.8312 8.33333 27.3417V35.1979C8.93125 35.7313 9.65 36.1646 10.5021 36.4354C10.9708 36.5854 11.3604 36.9021 11.5875 37.3187C16.1833 45.7479 22.8917 45.8333 25 45.8333C26.9354 45.8333 32.7479 45.7604 37.2438 39.2312C35.0125 40.1333 32.525 40.4896 29.4125 40.5917C28.6417 41.8417 26.9542 42.7083 25 42.7083C22.3167 42.7083 20.1396 41.075 20.1396 39.0625C20.1396 37.05 22.3167 35.4167 25 35.4167C26.9437 35.4167 28.6208 36.2729 29.4 37.5104C33.3583 37.4562 38.4333 36.8146 41.6667 32V27.3417ZM18.75 26.0417C20.1792 26.0417 21.3396 27.4417 21.3396 29.1667C21.3396 30.8917 20.1792 32.2917 18.75 32.2917C17.3208 32.2917 16.1604 30.8917 16.1604 29.1667C16.1604 27.4417 17.3208 26.0417 18.75 26.0417ZM31.25 26.0417C32.6792 26.0417 33.8396 27.4417 33.8396 29.1667C33.8396 30.8917 32.6792 32.2917 31.25 32.2917C29.8208 32.2917 28.6604 30.8917 28.6604 29.1667C28.6604 27.4417 29.8208 26.0417 31.25 26.0417ZM42.6625 22.9167H45.4896C43.7062 12.2542 35.2042 4.16667 25 4.16667C14.7958 4.16667 6.29375 12.2542 4.51042 22.9167H7.3375C8.42083 14.5354 14.4437 6.82917 25 6.82917C35.5562 6.82917 41.5792 14.5354 42.6625 22.9167Z" />
                        </svg>
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