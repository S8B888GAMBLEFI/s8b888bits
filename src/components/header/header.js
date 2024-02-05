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
import { setSubmenuDialogStatusAction, deleteSubmenuDialogStatusAction } from "../../redux/actions/submenuDialog/SubmenuDialogActions";

class Header extends React.Component {

  _isMounted = false;

  state = {
    isMobile: isMobile,
    isMetaMaskSupported: null,
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
      selectedClaimRevenueShare: false,
      selectedWheelOfFortune: false,
    }
  }

  static propTypes = {
    metamaskConfiguration: PropTypes.any,
    submenuDialogStatus: PropTypes.object,

    setMetamaskConfigurationAction: PropTypes.func,
    deleteMetamaskConfigurationAction: PropTypes.func,

    setSubmenuDialogStatusAction: PropTypes.func,
    deleteSubmenuDialogStatusAction: PropTypes.func,
  }

  static defaultProps = {

  }

  constructor(props, context) {
    super(props, context);
    /*
    const provider = detectEthereumProvider({ silent: true })
    let isMetaMaskSupported = false;
    if (provider) {
      isMetaMaskSupported = (typeof window && typeof window.ethereum !== 'undefined') && window?.ethereum?.isMetaMask;
    }
    */

    let metamaskConfiguration = null;
    if (this.props?.metamaskConfiguration) {
      metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
    }

    this.state = {
      isMobile: isMobile,

      //provider: provider,
      //isMetaMaskSupported: isMetaMaskSupported,

      accounts: metamaskConfiguration?.accounts || null,
      balance: metamaskConfiguration?.balance || null,
      loginStatus: metamaskConfiguration?.loginStatus || null,
      chainId: metamaskConfiguration?.chainId || null,

      submenuDialogStatus: props.submenuDialogStatus,

      selectedMenu: {
        selectedLaunchpad: false,
        selectedStaking: false,
        selectedClaimRevenueShare: false,
        selectedWheelOfFortune: false,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    const provider = await detectEthereumProvider({ silent: true })
    //console.log(provider);
    let isMetaMaskSupported = false;

    if (provider) {
      isMetaMaskSupported = (typeof window && typeof window.ethereum !== 'undefined') && window?.ethereum?.isMetaMask;
    }

    let metamaskConfiguration = null;
    if (this.props?.metamaskConfiguration) {
      metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
    }

    this.setState({
      isMobile: isMobile,

      provider: provider,
      isMetaMaskSupported: isMetaMaskSupported,

      accounts: metamaskConfiguration?.accounts || null,
      balance: metamaskConfiguration?.balance || null,
      loginStatus: metamaskConfiguration?.loginStatus || null,
      chainId: metamaskConfiguration?.chainId || null,
      web3Instance: new Web3(window.ethereum),

      submenuDialogStatus: this.props.submenuDialogStatus,

      selectedMenu: {
        selectedLaunchpad: typeof window !== 'undefined' && (window.location.pathname === "/") ? true : false,
        selectedStaking: typeof window !== 'undefined' && (window.location.pathname.includes("whitepaper")) ? true : false,
        selectedClaimRevenueShare: typeof window !== 'undefined' && (window.location.pathname.includes("claim-rewards")) ? true : false,
        selectedWheelOfFortune: typeof window !== 'undefined' && (window.location.pathname.includes("wheel-of-fortune")) ? true : false,
      }

    }, () => {
      if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
        window.ethereum.on('accountsChanged', this.accountsChanged);
        window.ethereum.on('chainChanged', this.chainChanged)
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

        //provider: provider,
        //isMetaMaskSupported: isMetaMaskSupported,

        accounts: metamaskConfiguration?.accounts || null,
        balance: metamaskConfiguration?.balance || null,
        loginStatus: metamaskConfiguration?.loginStatus || null,
        chainId: metamaskConfiguration?.chainId || null,

      }, () => {
        if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
          window.ethereum.on('accountsChanged', this.accountsChanged);
          window.ethereum.on('chainChanged', this.chainChanged)
        }
      });
    }

    if ((JSON.stringify(prevProps.submenuDialogStatus) !== JSON.stringify(this.props.submenuDialogStatus))) {
      this.setState({
        submenuDialogStatus: this.props.submenuDialogStatus,
      });
    }
  }

  chainChanged = async (accounts) => {
    //console.log("call chainChanged");
    let chainId = null;
    try {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })
    } catch (error) {

    }
    //console.log(chain_id);
    try {
      if (config.ENVIRONMENT_SITE === "LIVE") {
        if (chainId !== config.CHAINS.MAINNET.hex) { //if not main eth network
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.MAINNET.hex.toString()
                }
              ]
            });
          } catch (error) {
            return;
          }
        }
      }

      if (config.ENVIRONMENT_SITE === "LOCAL") {
        if (chainId !== config.CHAINS.GOERLI.hex) { //sepolia
          try {

            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.GOERLI.hex.toString()
                }
              ]
            });

          } catch (error) {
            return;
          }
        }
      }

      if (config.ENVIRONMENT_SITE === "DEV") {
        if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia
          try {

            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.SEPOLIA.hex.toString()
                }
              ]
            });

          } catch (error) {
            return;
          }
        }
      }

      let web3Instance = new Web3(window.ethereum);

      this.setState({
        web3Instance: web3Instance,
        chainId: chainId,
      }, () => {
        this.refreshAccounts(accounts);
      })
    } catch (error) {

    }
  }


  accountsChanged = (accounts) => {
    //console.log("call accountsChanged");
    this.refreshAccounts(accounts);
  }

  refreshAccounts = async (accounts) => {
    //console.log("call refreshAccounts");

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
            })
          }
        })
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  loginMetaMask = async () => {
    let chainId = null;
    try {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })

      if (config.ENVIRONMENT_SITE === "LIVE") {
        if (chainId !== config.CHAINS.MAINNET.hex) { //if not main eth network
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.MAINNET.hex.toString()
                }
              ]
            });
          } catch (error) {
            return;
          }
        }
      }

      if (config.ENVIRONMENT_SITE === "LOCAL") {
        if (chainId !== config.CHAINS.GOERLI.hex) { //sepolia
          try {

            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.GOERLI.hex.toString()
                }
              ]
            });

          } catch (error) {
            return;
          }
        }
      }

      if (config.ENVIRONMENT_SITE === "DEV") {
        if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia
          try {

            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: config.CHAINS.SEPOLIA.hex.toString()
                }
              ]
            });

          } catch (error) {
            return;
          }
        }
      }

    } catch (error) {
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
        this.props.setMetamaskConfigurationAction(metamaskConfigurationJSON);

        window.ethereum.on('accountsChanged', this.accountsChanged);
        window.ethereum.on('chainChanged', this.chainChanged)
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

  disconnectMetaMask = () => {
    //console.log("call disconnect metamask");
    this.setState({
      //web3Instance: null,
      //accounts: null,
      //balance: null,
      loginStatus: false
    }, () => {
      this.props.deleteMetamaskConfigurationAction();
      //window.ethereum?.removeListener('accountsChanged', this.refreshAccounts);
    })
  }

  shortUsername = (username) => {
    if (username && username.length === 42) {
      //return username.slice(0, 20) + "...";
      return username.slice(0, 8) + "..." + username.slice(username.length - 7, username.length);
    } else {
      return username;
    }
  }

  formatBalance = (rawBalance) => {
    if (!this.state?.web3Instance) return;
    //const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(config.getMinimumFractionDigits("ETH"))
    if (rawBalance === "0x0") return "0.00";
    const balance = this.state.web3Instance.utils.fromWei(rawBalance, 'ether');
    return balance;
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
              <img src="/pictures/logo/888logoPrimary.svg" alt={config.casinoName} loading="lazy" />
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
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: true,
                          selectedStaking: false,
                          selectedClaimRevenueShare: false,
                          selectedWheelOfFortune: false,
                        }
                      })
                    }}>
                    <FormattedMessage id="Launchpad" />
                  </Link>
                </li>
                <li>
                  <a href="https://docs.888bits.com/">
                    <FormattedMessage id="Staking" />
                  </a>
                </li>
                <li>
                  <Link to="/claim-revenue-share/" title="Claim Revenue Share"
                    className={this.state?.selectedMenu?.selectedClaimRevenueShare ? "active" : null}
                    onClick={(event) => {
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: false,
                          selectedStaking: false,
                          selectedClaimRevenueShare: true,
                          selectedWheelOfFortune: false,
                        }
                      })
                    }}>
                    <FormattedMessage id="Claim Revenue Share" />
                  </Link>
                </li>
                <li>
                  <Link to="/wheel-of-fortune/" title="Wheel of Fortune"
                    className={this.state?.selectedMenu?.selectedWheelOfFortune ? "active" : null}
                    onClick={(event) => {
                      this.setState({
                        selectedMenu: {
                          selectedLaunchpad: false,
                          selectedStaking: false,
                          selectedClaimRevenueShare: false,
                          selectedWheelOfFortune: true,
                        }
                      })
                    }}>
                    <FormattedMessage id="Wheel of Fortune" />
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
              <ul className={!this.state?.loginStatus ? "sec-nav" : "sec-nav logged-in"}>
                {
                  (!this.state.isMobile && !this.state?.loginStatus && this.state.isMetaMaskSupported) &&
                  <li>
                    <button type="button" aria-label="Connect Wallet" className="btn connect-wallet" onClick={
                      (event) => {
                        event.preventDefault();
                        this.loginMetaMask();
                      }
                    }>
                      <FormattedMessage id="Connect Wallet" />
                    </button>
                  </li>
                }
                {
                  (!this.state.isMobile && this.state.loginStatus === null && this.state.isMetaMaskSupported === null) &&
                  <li>
                    <span className="message">
                      <FormattedMessage id="Detecting Metamask ..." />
                    </span>
                  </li>
                }
                {
                  (!this.state.isMobile && !this.state?.loginStatus && !this.state?.isMetaMaskSupported) &&
                  <li>
                    <span className="message">
                      <FormattedMessage id="MetaMask is not installed" />
                    </span>
                  </li>
                }

                {
                  (this.state?.loginStatus && this.state?.isMetaMaskSupported) &&
                  <li className="account">
                    <button type="button" className="account-trigger active">
                      <span className="username">
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

                {
                  (this.state?.loginStatus && this.state?.isMetaMaskSupported) &&
                  <li className="logout">
                    <button type="button" aria-label="Logout" onClick={(event) => {
                      event.preventDefault();
                      this.disconnectMetaMask();
                    }}>
                      <img src="/pictures/icon-logout.svg" alt="Logout" loading="lazy"></img>
                    </button>
                  </li>
                }

              </ul>
            }
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {

  const { metamaskConfiguration } = state.metamaskConfiguration;
  const { submenuDialogStatus } = state.submenuDialogStatus;

  return {
    metamaskConfiguration,
    submenuDialogStatus
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setMetamaskConfigurationAction,
    deleteMetamaskConfigurationAction,

    setSubmenuDialogStatusAction,
    deleteSubmenuDialogStatusAction,
  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));

export default hoc;
