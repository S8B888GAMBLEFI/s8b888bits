import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, Link, FormattedNumber, FormattedMessage } from "gatsby-plugin-react-intl"
import * as config from "../../configuration/Config";
import {
  isMobile
} from "react-device-detect";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
import { setPhantomConfigurationAction, deletePhantomConfigurationAction } from "../../redux/actions/phantomConfiguration/PhantomConfigurationActions";
import { setSubmenuDialogStatusAction, deleteSubmenuDialogStatusAction } from "../../redux/actions/submenuDialog/SubmenuDialogActions";
import { setAccountInformationAction, deleteAccountInformationAction } from "../../redux/actions/accountInformation/AccountInformationActions";
import { loginPlayerAction, logoutPlayerAction } from "../../redux/actions/session/SessionActions";
/*
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
*/

class Header extends React.Component {

  _isMounted = false;

  state = {
    isMobile: isMobile,
    isMetaMaskSupported: null,
    isPhantomSupported: null,
    loginStatus: null,
    provider: null,
    web3Instance: null,
    accounts: null,
    balance: null,
    chainId: null,

    submenuDialogStatus: null,

    selectedMenu: {
      selectedLaunchpad: false,
      selectedStaking: false,
      selectedRevenueDividendShare: false,
      selectedWheelOfDragon: false,
    }
  }

  static propTypes = {
    session: PropTypes.any,
    metamaskConfiguration: PropTypes.any,
    phantomConfiguration: PropTypes.any,
    submenuDialogStatus: PropTypes.object,
    accountInformation: PropTypes.object,

    loginPlayerAction: PropTypes.func,
    logoutPlayerAction: PropTypes.func,

    setMetamaskConfigurationAction: PropTypes.func,
    deleteMetamaskConfigurationAction: PropTypes.func,

    setPhantomConfigurationAction: PropTypes.func,
    deletePhantomConfigurationAction: PropTypes.func,

    setSubmenuDialogStatusAction: PropTypes.func,
    deleteSubmenuDialogStatusAction: PropTypes.func,

    setAccountInformationAction: PropTypes.func,
    deleteAccountInformationAction: PropTypes.func,
  }

  static defaultProps = {
    session: null,
    metamaskConfiguration: null,
    phantomConfiguration: null,
    accountInformation: null,
  }

  constructor(props, context) {
    super(props, context);

    let metamaskConfiguration = null;
    let configState = null;
    if (this.props?.metamaskConfiguration) {
      metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);

      configState = {
        accounts: metamaskConfiguration?.accounts || null,
        balance: metamaskConfiguration?.balance || null,
        loginStatus: metamaskConfiguration?.loginStatus || null,
        chainId: metamaskConfiguration?.chainId || null,
      }
    }

    /*
    let phantomConfiguration = null;
    if (this.props?.phantomConfiguration) {
      phantomConfiguration = JSON.parse(this.props.phantomConfiguration);

      configState = {
        accounts: phantomConfiguration?.accounts || null,
        balance: phantomConfiguration?.balance || null,
        loginStatus: phantomConfiguration?.loginStatus || null,
        chainId: phantomConfiguration?.chainId || null,
      }
    }
    */

    this.state = {
      isMobile: isMobile,

      ...configState,

      submenuDialogStatus: props.submenuDialogStatus,

      selectedMenu: {
        selectedLaunchpad: false,
        selectedStaking: false,
        selectedRevenueDividendShare: false,
        selectedWheelOfDragon: false,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    let provider = await detectEthereumProvider({ silent: true })
    //console.log(provider);
    let isMetaMaskSupported = false;
    let isPhantomSupported = false;

    if (provider && provider === window.ethereum) {
      isMetaMaskSupported = true;
      isPhantomSupported = false;
    }

    /*
    if (!isMetaMaskSupported) {
      isPhantomSupported = window.phantom?.solana?.isPhantom;

      if (isPhantomSupported) {
        //isMetaMaskSupported = false;

        if ('phantom' in window) {
          provider = window.phantom?.solana;
        }
      }
    }
    */

    let metamaskConfiguration = null;
    let configState = null;
    if (this.props?.metamaskConfiguration) {
      metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
      configState = {
        accounts: metamaskConfiguration?.accounts || null,
        balance: metamaskConfiguration?.balance || null,
        loginStatus: metamaskConfiguration?.loginStatus || null,
        chainId: metamaskConfiguration?.chainId || null,
      }
    }

    /*
    let phantomConfiguration = null;
    if (this.props?.phantomConfiguration) {
      phantomConfiguration = JSON.parse(this.props.phantomConfiguration);
      configState = {
        accounts: phantomConfiguration?.accounts || null,
        balance: phantomConfiguration?.balance || null,
        loginStatus: phantomConfiguration?.loginStatus || null,
        chainId: phantomConfiguration?.chainId || null,
      }
    }
    */

    this.setState({
      isMobile: isMobile,

      provider: provider,
      isMetaMaskSupported: isMetaMaskSupported,
      //isPhantomSupported: isPhantomSupported,

      ...configState,
      web3Instance: new Web3(window.ethereum),

      submenuDialogStatus: this.props.submenuDialogStatus,

      selectedMenu: {
        selectedLaunchpad: typeof window !== 'undefined' && (window.location.pathname === "/") ? true : false,
        selectedStaking: typeof window !== 'undefined' && (window.location.pathname.includes("whitepaper")) ? true : false,
        selectedRevenueDividendShare: typeof window !== 'undefined' && (window.location.pathname.includes("claim-rewards")) ? true : false,
        selectedWheelOfDragon: typeof window !== 'undefined' && (window.location.pathname.includes("wheel-of-fortune")) ? true : false,
      }

    }, () => {
      if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
        if (this.state.isMetaMaskSupported) {
          window?.ethereum.on('accountsChanged', this.metaMaskAccountsChanged);
          window?.ethereum.on('chainChanged', this.metaMaskChainChanged)
        }
        /*
        if (this.state.isPhantomSupported) {
          this.state.provider.on('accountChanged', this.phantomAccountsChanged);
        }
        */
      }
    });

    window.addEventListener('resize', () => {
      this.setState({
        isMobile: isMobile
      })
    })
  }

  componentWillUnmount() {
    this._isMounted = false;

  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.metamaskConfiguration) !== JSON.stringify(prevProps.metamaskConfiguration)) {
      let metamaskConfiguration = null;
      if (this.props?.metamaskConfiguration) {
        metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
      }

      this.setState({
        isMobile: isMobile,

        accounts: metamaskConfiguration?.accounts || null,
        balance: metamaskConfiguration?.balance || null,
        loginStatus: metamaskConfiguration?.loginStatus || null,
        chainId: metamaskConfiguration?.chainId || null,

      }, () => {
        if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
          if (this.state.isMetaMaskSupported) {
            window?.ethereum.on('accountsChanged', this.metaMaskAccountsChanged);
            window?.ethereum.on('chainChanged', this.metaMaskChainChanged)
          }
        }
      });
    }

    /*
    if (JSON.stringify(this.props.phantomConfiguration) !== JSON.stringify(prevProps.phantomConfiguration)) {
      let phantomConfiguration = null;
      if (this.props?.phantomConfiguration) {
        phantomConfiguration = JSON.parse(this.props.phantomConfiguration);
      }

      this.setState({
        isMobile: isMobile,

        accounts: phantomConfiguration?.accounts || null,
        balance: phantomConfiguration?.balance || null,
        loginStatus: phantomConfiguration?.loginStatus || null,
        chainId: phantomConfiguration?.chainId || null,

      }, () => {
        if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
          if (this.state.isPhantomSupported) {
            this.state.provider.on('accountChanged', this.phantomAccountsChanged);
          }
        }
      });
    }
    */

    if ((JSON.stringify(prevProps.submenuDialogStatus) !== JSON.stringify(this.props.submenuDialogStatus))) {
      this.setState({
        submenuDialogStatus: this.props.submenuDialogStatus,
      });
    }
  }

  metaMaskChainChanged = async (accounts) => {
    //console.log("call metaMaskChainChanged");
    let chainId = null;
    try {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })
    } catch (error) {

    }

    //console.log(chainId);
    //console.log(config.CHAINS[config.DEFAULT_CHAIN].hex);

    try {

      if (chainId !== config.CHAINS[config.DEFAULT_CHAIN].hex) { //if not default eth network for configuration
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: config.CHAINS[config.DEFAULT_CHAIN].hex.toString()
              }
            ]
          });
        } catch (error) {
          return;
        }
      }

      let web3Instance = new Web3(window.ethereum);

      this.setState({
        web3Instance: web3Instance,
        chainId: chainId,
      }, () => {
        this.refreshMetaMaskAccounts(accounts);
      })
    } catch (error) {

    }
  }

  metaMaskAccountsChanged = (accounts) => {
    //console.log("call metaMaskAccountsChanged");
    this.refreshMetaMaskAccounts(accounts);
  }

  refreshMetaMaskAccounts = async (accounts) => {
    //console.log("call refreshMetaMaskAccounts");

    try {
      if (this.state.web3Instance?.eth) {
        await this.state.web3Instance.eth.getAccounts().then(async (result) => {
          if (result && result.length > 0) {
            //console.log(result[0]);
            const balance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [result[0], "latest"]
            });
            this.setState({
              accounts: result,
              balance: balance,//this.formatBalance(balance)
            }, () => {
              this.props.setAccountInformationAction({
                ...this.props.accountInformation,
                accounts: result,
                balance: balance,
              })
              this.loginMetaMask();
            })
          }
        })
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /*
  phantomAccountsChanged = (publicKey) => {
    //console.log("call phantomAccountsChanged");
    this.refreshPhantomAccounts(publicKey);
  }
  */

  /*
  refreshPhantomAccounts = async (publicKey) => {
    //console.log("call refreshPhantomAccounts");

    try {

      let accounts = publicKey;

      let wallet = new PublicKey(publicKey);
      //accounts[0] = publicKey;
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      let balance = await connection.getBalance(wallet);
      balance = balance / LAMPORTS_PER_SOL;

      this.setState({
        accounts: accounts,
        balance: balance, //this.formatBalance(balance)
      }, () => {
        this.props.setAccountInformationAction({
          ...this.props.accountInformation,
          accounts: accounts,
          balance: balance,
        })
        this.loginPhantom();
      })
    } catch (error) {
      console.error(error);
      return;
    }
  }
  */

  loginMetaMask = async () => {
    let chainId = null;
    try {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })

      //console.log("loginMetaMask chainId=" + chainId);

      if (chainId !== config.CHAINS[config.DEFAULT_CHAIN].hex) { //if not default eth network for configuration
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: config.CHAINS[config.DEFAULT_CHAIN].hex.toString()
              }
            ]
          });
        } catch (error) {
          console.error(error);
          return;
        }
      }
      //console.log("loginMetaMask chainId=" + chainId);
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      let web3Instance = new Web3(window.ethereum);

      let balance = null;
      try {

        await web3Instance.eth.getAccounts().then(async (result) => {
          accounts = result;

          balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], "latest"]
          });
        })

      } catch (error) {
        console.error(error);
        return;
      }

      let loginStatus = accounts.length > 0;

      let metamaskConfigurationJSON = JSON.stringify(
        {
          accounts: accounts,
          balance: balance,
          loginStatus: loginStatus,
          chainId: chainId,
        }
      );

      //console.log(metamaskConfigurationJSON);

      this.setState({
        accounts: accounts,
        loginStatus: loginStatus,
        web3Instance: web3Instance,
        balance: balance,
        chainId: chainId,
      }, () => {
        this.props.loginPlayerAction({
          loginStatus: loginStatus,
          accounts: accounts,
          chainId: chainId,
        });
        this.props.setMetamaskConfigurationAction(metamaskConfigurationJSON);
        this.props.setAccountInformationAction({
          ...this.props.accountInformation,
          accounts: accounts,
          balance: balance,
        });

        window?.ethereum.on('accountsChanged', this.metaMaskAccountsChanged);
        window?.ethereum.on('chainChanged', this.metaMaskChainChanged);
      })
    } catch (error) {

      if (error.code === 4001) {
        alert(error.message);
      } else {
        console.error(error);
      }
      return;
    }

  }

  /*
  loginPhantom = async () => {
    let chainId = null;

    let accounts = [];
    let balance = null;
    let web3Instance = null;
    try {

      try {
        const resp = await this.state.provider.connect();
        const publicKey = resp.publicKey.toString();
        //console.log(resp.publicKey.toString());

        accounts[0] = publicKey;

        let wallet = new PublicKey(publicKey);
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        try {
          balance = await connection.getBalance(wallet);
        } catch (error) {
          console.error(error);
          return;
        }
        balance = balance / LAMPORTS_PER_SOL;
        //console.log(balance);
      } catch (error) {
        console.error(error);
        return;
      }

      let loginStatus = accounts.length > 0;

      let phantomConfigurationJSON = JSON.stringify(
        {
          accounts: accounts,
          balance: balance,
          loginStatus: loginStatus,
          chainId: chainId,
        }
      );

      //console.log(metamaskConfigurationJSON);

      this.setState({
        accounts: accounts,
        loginStatus: loginStatus,
        web3Instance: web3Instance,
        balance: balance,
        chainId: chainId,
      }, () => {
        this.props.loginPlayerAction({
          loginStatus: loginStatus,
          accounts: accounts,
          chainId: chainId,
        });
        this.props.setPhantomConfigurationAction(phantomConfigurationJSON);
        this.props.setAccountInformationAction({
          ...this.props.accountInformation,
          accounts: accounts,
          balance: balance,
        });

        this.state.provider.on('accountChanged', this.phantomAccountsChanged);
      })
    } catch (error) {

      if (error.code === 4001) {
        alert(error.message);
      } else {
        console.error(error);
      }
      return;
    }
  }
  */

  disconnectMetaMask = () => {
    //console.log("call disconnect metamask");
    this.setState({
      loginStatus: false
    }, () => {
      this.props.logoutPlayerAction();
      this.props.deleteMetamaskConfigurationAction();
      this.props.deletePhantomConfigurationAction();
      this.props.deleteAccountInformationAction();
    })
  }

  disconnectPhantom = () => {
    //console.log("call disconnect phantom");
    this.setState({
      loginStatus: false
    }, () => {
      this.props.logoutPlayerAction();
      this.props.deletePhantomConfigurationAction();
      this.props.deleteMetamaskConfigurationAction();
      this.props.deleteAccountInformationAction();
    })
  }

  shortUsername = (username) => {
    if (username && username.length >= 42) {
      //return username.slice(0, 20) + "...";
      return username.slice(0, 8) + "..." + username.slice(username.length - 7, username.length);
    } else {
      return username;
    }
  }

  formatBalance = (rawBalance) => {
    if (!this.state?.web3Instance) return;
    if (rawBalance === "0x0") return "0.00";
    const balance = this.state.web3Instance.utils.fromWei(rawBalance, 'ether');
    return balance;
  }

  openMetaMaskUrl = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  render() {
    return (
      <header>

        <div className="header-wrapper">

          <div className="header-left">
            <button type="button" aria-label="Navigation" className={
              (this.state.isMobile &&
                (this.state?.submenuDialogStatus?.status && this.state.submenuDialogStatus.status === "OPEN")
              )
                ?
                "nav-trigger active"
                :
                "nav-trigger"
            } onClick={(event) => {
              event.preventDefault();
              if (this.state?.submenuDialogStatus?.status && this.state.submenuDialogStatus.status === "OPEN") {
                this.props.deleteSubmenuDialogStatusAction();
              } else {
                this.props.setSubmenuDialogStatusAction({ status: "OPEN" })
              }
            }}>
              <span></span>
            </button>
            <Link to="/" className="logo">
              <img src="/pictures/logo/888logoPrimary.svg" alt={config.casinoName} loading="lazy" decoding="async" width="195" height="70" />
            </Link>
          </div>

          <div className="header-center">
            <nav className={
              (this.state.isMobile &&
                (this.state?.submenuDialogStatus?.status && this.state.submenuDialogStatus.status === "OPEN")) ?
                "visible"
                :
                null
            }>
              <ul className="main-nav">
                <li>
                  <Link to="/" title="Launchpad"
                    className={this.state?.selectedMenu?.selectedLaunchpad ? "active" : null}
                    onClick={(event) => {
                      this.props.deleteSubmenuDialogStatusAction();
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: true,
                          selectedStaking: false,
                          selectedRevenueDividendShare: false,
                          selectedWheelOfDragon: false,
                        }
                      })
                    }}>
                    <FormattedMessage id="Launchpad" />
                  </Link>
                </li>
                <li>
                  <Link to="/staking/" title="Staking"
                    className={this.state?.selectedMenu?.selectedStaking ? "active" : null}
                    onClick={(event) => {
                      this.props.deleteSubmenuDialogStatusAction();
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: false,
                          selectedStaking: true,
                          selectedRevenueDividendShare: false,
                          selectedWheelOfDragon: false,
                        }
                      })
                    }}
                  >
                    <FormattedMessage id="Staking" />
                  </Link>
                </li>
                <li>
                  <Link to="/revenue-dividend-share/" title="Revenue Dividend Share"
                    className={this.state?.selectedMenu?.selectedRevenueDividendShare ? "active" : null}
                    onClick={(event) => {
                      this.props.deleteSubmenuDialogStatusAction();
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: false,
                          selectedStaking: false,
                          selectedRevenueDividendShare: true,
                          selectedWheelOfDragon: false,
                        }
                      })
                    }}>
                    <FormattedMessage id="Revenue Dividend Share" />
                  </Link>
                </li>
                <li>
                  <Link to="/wheel-of-dragon/" title="Wheel of Dragon"
                    className={this.state?.selectedMenu?.selectedWheelOfDragon ? "active" : null}
                    onClick={(event) => {
                      this.props.deleteSubmenuDialogStatusAction();
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: false,
                          selectedStaking: false,
                          selectedRevenueDividendShare: false,
                          selectedWheelOfDragon: true,
                        }
                      })
                    }}>
                    <FormattedMessage id="Wheel of Dragon" />
                  </Link>
                </li>
                <li>
                  <a href={config.CASINO_BASE_URL} title="Back to casino" className="back">
                    <FormattedMessage id="Back to casino" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-right">
            {
              <ul className={!this.props?.session?.loginStatus ? "sec-nav" : "sec-nav logged-in"}>
                {
                  (!this.props?.session?.loginStatus && this.state.isMetaMaskSupported) &&
                  <li>
                    <button type="button" aria-label="Connect MetaMask Wallet" className="btn connect-metamask-wallet small" onClick={
                      (event) => {
                        event.preventDefault();
                        if (this.state.isMetaMaskSupported) {
                          this.loginMetaMask();
                        }
                      }
                    }>
                    </button>
                  </li>
                }
                {/*
                  (!this.props?.session?.loginStatus && this.state.isPhantomSupported) &&
                  <li>
                    <button type="button" aria-label="Connect Phantom Wallet" className="btn connect-phantom-wallet small" onClick={
                      (event) => {
                        event.preventDefault();
                        if (this.state.isPhantomSupported) {
                          this.loginPhantom();
                        }
                      }
                    }>
                    </button>
                  </li>
                */}
                {
                  /*(this.props?.session?.loginStatus === null && this.state.isMetaMaskSupported === null) &&
                  <li>
                    <span className="message">
                      <FormattedMessage id="Detecting Metamask ..." />
                    </span>
                  </li>*/
                }
                {
                  (!this.props?.session?.loginStatus && (!this.state?.isMetaMaskSupported && !this.state?.isPhantomSupported)) &&
                  <li>
                    <button type="button" aria-label="Connect MetaMask Wallet" className="btn connect-metamask-wallet small" onClick={
                      (event) => {
                        event.preventDefault();
                        if (config.ENVIRONMENT_SITE === "DEV") {
                          this.openMetaMaskUrl("https://metamask.app.link/dapp/dev.s8b.888bits.com");
                        } else if (config.ENVIRONMENT_SITE === "UAT") {
                          this.openMetaMaskUrl("https://metamask.app.link/dapp/uat.s8b.888bits.com");
                        } else if (config.ENVIRONMENT_SITE === "LIVE") {
                          this.openMetaMaskUrl("https://metamask.app.link/dapp/s8b.888bits.com");
                        }
                      }
                    }>
                    </button>
                  </li>
                }
                {
                  (this.props?.session?.loginStatus && this.state?.isMetaMaskSupported && this.state?.accounts?.[0]) &&
                  <li className="account">
                    <button type="button" className="account-trigger active">
                      <span className="username" title={this.state.accounts[0]}>
                        {this.shortUsername(this.state.accounts[0])}
                      </span>
                      <br />
                      <span className="balance">
                        {
                          <FormattedNumber value={this.formatBalance(this.state.balance)}
                            locale={this.props.intl.locale}
                            minimumFractionDigits={2}
                            maximumFractionDigits={config.getMinimumFractionDigits("ETH")}
                            style="decimal"
                          />
                        }
                        &nbsp;
                        ETH
                      </span>
                    </button>
                  </li>
                }
                {/*
                  (this.props?.session?.loginStatus && this.state?.isPhantomSupported && this.state?.accounts?.[0]) &&
                  <li className="account">
                    <button type="button" className="account-trigger active">
                      <span className="username" title={this.state.accounts[0]}>
                        {this.shortUsername(this.state.accounts[0])}
                      </span>
                      <br />
                      <span className="balance">
                        {
                          <FormattedNumber value={this.state.balance}
                            locale={this.props.intl.locale}
                            minimumFractionDigits={2}
                            maximumFractionDigits={config.getMinimumFractionDigits("SOL")}
                            style="decimal"
                          />
                        }
                        &nbsp;
                        SOL
                      </span>
                    </button>
                  </li>
                */}
                {
                  (this.props?.session?.loginStatus && this.state?.isMetaMaskSupported) &&
                  <li className="logout">
                    <button type="button" aria-label="Logout" onClick={(event) => {
                      event.preventDefault();
                      this.disconnectMetaMask();
                    }}>
                      <img src="/pictures/icon-logout.svg" alt="Logout" loading="lazy" decoding="async"></img>
                    </button>
                  </li>
                }
                {/*
                  (this.props?.session?.loginStatus && this.state?.isPhantomSupported) &&
                  <li className="logout">
                    <button type="button" aria-label="Logout" onClick={(event) => {
                      event.preventDefault();
                      this.disconnectPhantom();
                    }}>
                      <img src="/pictures/icon-logout.svg" alt="Logout" loading="lazy" decoding="async"></img>
                    </button>
                  </li>
                */}

                {/*
                  (!this.props?.session?.loginStatus && this.state?.isMetaMaskSupported) &&
                  <li>
                    <button type="button" className="btn login-trigger">
                      Log In
                    </button>
                  </li>
              */}
                {/*
                  (!this.props?.session?.loginStatus && this.state?.isMetaMaskSupported) &&
                  <li>
                    <button type="button" className="btn signup-trigger">
                      Sign Up
                    </button>
                  </li>
            */}

              </ul>
            }
          </div>
        </div >
      </header >
    );
  }
}

const mapStateToProps = state => {

  const { session } = state.session;
  const { metamaskConfiguration } = state.metamaskConfiguration;
  const { phantomConfiguration } = state.phantomConfiguration;
  const { submenuDialogStatus } = state.submenuDialogStatus;
  const { accountInformation } = state.accountInformation;

  return {
    session,
    metamaskConfiguration,
    phantomConfiguration,
    submenuDialogStatus,
    accountInformation
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loginPlayerAction,
    logoutPlayerAction,

    setMetamaskConfigurationAction,
    deleteMetamaskConfigurationAction,

    setPhantomConfigurationAction,
    deletePhantomConfigurationAction,

    setSubmenuDialogStatusAction,
    deleteSubmenuDialogStatusAction,

    setAccountInformationAction,
    deleteAccountInformationAction,
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));

export default hoc;
