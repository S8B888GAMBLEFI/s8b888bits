import React from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, Link } from "gatsby-plugin-react-intl"
import * as config from "../../configuration/Config";
import {
  isMobile
} from "react-device-detect";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

class Header extends React.Component {

  _isMounted = false;

  state = {
    isMobile: isMobile,
    isMetaMaskSupported: false,
    loginStatus: false,
    provider: null,
    web3Instance: null,
    accounts: null,
    balance: null,
  }

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props, context) {
    super(props, context);

  }

  async componentDidMount() {
    this._isMounted = true;

    const provider = await detectEthereumProvider({ silent: true })
    //console.log(provider);
    let web3Instance = null;
    let isMetaMaskSupported = false;
    let accounts = null;
    let balance = null;

    if (provider) {
      isMetaMaskSupported = (typeof window && typeof window.ethereum !== 'undefined') && window?.ethereum?.isMetaMask;
      web3Instance = new Web3(window.ethereum);

      //await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.ethereum.on('accountsChanged', this.accountsChanged);
      //window.ethereum.on('networkChanged', this.networkChanged);
      window.ethereum.on('chainChanged', this.chainChanged)
      // Now you can access the user's Ethereum address with web3.eth.accounts[0]


      let chain_id = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })
      //console.log(chain_id);
      if (chain_id !== 0x1) { //if not main eth network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1"
            }
          ]
        });
        web3Instance = new Web3(window.ethereum);
      }

      try {
        await web3Instance.eth.getAccounts().then(async (result) => {
          //console.log(result[0]);
          accounts = result;

          balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [result[0], "latest"]
          });
          /*this.setState({
            accounts: result,
            balance: this.formatBalance(balance)
          })*/
        })
      } catch (error) {
        console.error(error);
        return;
      }
    }

    this.setState({
      isMobile: isMobile,

      provider: provider,
      isMetaMaskSupported: isMetaMaskSupported,
      web3Instance: web3Instance,
      accounts: accounts,
      balance: balance,
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

  }

  chainChanged = async (accounts) => {
    //console.log("call chainChanged");
    let chain_id = null;
    try {
      chain_id = await window.ethereum.request({
        method: "eth_chainId",
        params: []
      })
    } catch (error) {

    }
    //console.log(chain_id);
    try {
      if (chain_id !== 0x1) { //if not main eth network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1"
            }
          ]
        });
        let web3Instance = new Web3(window.ethereum);

        this.setState({
          web3Instance: web3Instance
        }, () => {
          this.refreshAccounts(accounts);
        })
      }
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
    } catch (error) {
      console.error(error);
      return;
    }
  }

  loginMetaMask = async () => {
    //console.log(this.state.provider);

    if (this.state?.web3Instance) {
      const account = this.state.web3Instance.eth.accounts[0];
      const chain_id = await this.state.web3Instance.eth.getChainId();
      const version = this.state.web3Instance.version; //this.state.web3Instance.eth.getProtocolVersion();
      const message = "This site wants you to sign in with your Ethereum account:\n" +
        this.state.accounts[0] + "\n\n" +
        //account + "\n\n" +
        "Verification Needed\n\n" +
        "URI:" + config.BASE_URL + "\n" +
        "Version:" + version + "\n" +
        "Chain ID: " + chain_id + "\n"
        //"Nonce: \n" +
        //"Issued At: \n" +
        //"Expiration Time: \n" +
        //"Not Before: \n"
        ;

      //console.log(this.state.accounts[0]);
      //console.log(account);
      let signature = null;
      try {
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, this.state.accounts[0]]
        });
      } catch (error) {

        if (error.code === 4001) {
          alert(error.message);
        } else {
          console.error(error);
        }
        return;
      }

      //console.log(signature);
      let signingAddress = null;

      try {
        signingAddress = await this.state.web3Instance.eth.personal.ecRecover(message, signature);
      } catch (error) {
        console.error(error);
        return;
      }

      //console.log(signingAddress);
      //console.log(typeof signingAddress);
      //console.log(this.state.accounts[0]);
      //console.log(typeof this.state.accounts[0]);

      if (this.state.accounts[0].toLowerCase() === signingAddress.toLowerCase()) {
        //console.log("Address match");
        this.setState({
          loginStatus: true
        })
      } else {
        //console.log("Address not match");
        this.setState({
          loginStatus: false
        })
      }
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
    //const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(config.getMinimumFractionDigits("ETH"))
    if (rawBalance === "0x0") return 0;
    const balance = this.state.web3Instance.utils.fromWei(rawBalance, 'ether');
    return balance;
  }

  render() {
    return (
      <header>

        <div className="header-wrapper">

          <div className="header-left">
            <button type="button" aria-label="Navigation" className="nav-trigger">
              <span></span>
            </button>
            <Link to="/" className="logo">
              <img src="/pictures/logo/888logoPrimary.svg" alt={config.casinoName} loading="lazy" />
            </Link>
          </div>

          <div className="header-right">
            <nav className="visible">
              <ul className="main-nav">
                <li>
                  <Link to="/presale/" title="Presale">
                    Presale
                  </Link>
                </li>

                <li>
                  <Link to="/token888/" title="$888">
                    $888
                  </Link>
                </li>

                <li>
                  <Link to="/tokenomics/" title="Tokenomics">
                    Tokenomics
                  </Link>
                </li>

                <li>
                  <Link to="/whitepaper/" title="Whitepaper">
                    Whitepaper
                  </Link>
                </li>

                {/*
                <li>
                  <Link to="/benefits/" title="Benefits">
                    Benefits
                  </Link>
                </li>
                */}
                <li>
                  <Link to="/roadmap" title="Roadmap">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link to="/faq/" title="FAQ">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a href="https://www.888bits.com/" title="Back to casino" className="pink">
                    Back to casino
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            {
              !this.state.loginStatus &&
              <ul className="sec-nav">
                {
                  (!this.state.loginStatus && this.state.isMetaMaskSupported) &&
                  <li>
                    <button type="button" aria-label="Connect Wallet" className="btn connect-wallet" onClick={
                      (event) => {
                        event.preventDefault();
                        this.loginMetaMask();
                      }
                    }>
                      Connect Wallet
                    </button>
                  </li>
                }
                {
                  !this.state.isMetaMaskSupported &&
                  <li>
                    <span className="message">
                      MetaMask is not installed
                    </span>
                  </li>
                }

                {
                  this.state.loginStatus &&
                  <li>
                    <span className="message">
                      Logged in
                    </span>
                  </li>
                }
              </ul>
            }
            {
              this.state.loginStatus &&
              <ul className="sec-nav logged-in">
                <li className="account">
                  <button type="button" className="account-trigger active">
                    <span className="username">
                      {this.shortUsername(this.state.accounts[0])}
                    </span>
                    <br />
                    <span className="balance">
                      {this.formatBalance(this.state.balance)}
                    </span>
                  </button>
                </li>
                <li className="logout">
                  <button type="button" aria-label="Logout" onClick={(event) => {
                    event.preventDefault();
                    this.disconnectMetaMask();
                  }}>
                    <img src="/pictures/icon-logout.svg" alt="Logout" loading="lazy"></img>
                  </button>
                </li>
              </ul>
            }
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {

  return {
  };
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({

  }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));

export default hoc;
