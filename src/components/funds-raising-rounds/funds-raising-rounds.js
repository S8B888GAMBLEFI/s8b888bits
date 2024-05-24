import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import {
    isMobile
} from "react-device-detect";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
import { setAccountInformationAction, deleteAccountInformationAction } from "../../redux/actions/accountInformation/AccountInformationActions";
import { loginPlayerAction, logoutPlayerAction } from "../../redux/actions/session/SessionActions";
import { ethers } from "ethers";
import WalletCryptoCurrencyIcon from "../currency-icon/wallet-crypto-currency-icon";

class FundsRaisingRounds extends React.Component {

    state = {
        isMobile: isMobile,
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,
        loginStatus: null,

        //selectedCurrencyFrom: 'ETH',
        //tokenAmount: '',
        seedRoundCurrencyFrom: 'USDC',
        seedRoundS8BAmount: null,

        strategicRoundCurrencyFrom: 'USDC',
        strategicRoundS8BAmount: null,

        publicPresaleRoundCurrencyFrom: 'USDC',
        publicPresaleRoundS8BAmount: null,

        tokenBalance: null,


        seedRoundS8BInUSD: null,
        strategicRoundS8BInUSD: null,
        publicPresaleRoundS8BInUSD: null,
        ethInUSD: null,
        usdtInUSD: null,
        usdcInUSD: null,

        seedPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        },
        strategicPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        },
        publicPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        }
    }

    static propTypes = {
        session: PropTypes.any,
        metamaskConfiguration: PropTypes.any,
        accountInformation: PropTypes.object,

        loginPlayerAction: PropTypes.func,
        logoutPlayerAction: PropTypes.func,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setSubmenuDialogStatusAction: PropTypes.func,
        deleteSubmenuDialogStatusAction: PropTypes.func,

        setAccountInformationAction: PropTypes.func,
        deleteAccountInformationAction: PropTypes.func,
    }

    static defaultProps = {
        session: null,
    }

    refSeedRoundUSDC = null;
    refSeedRoundUSDT = null;
    refSeedRoundS8B = null;

    refStrategicRoundUSDC = null;
    refStrategicRoundUSDT = null;
    refStrategicRoundS8B = null;

    refPublicPresaleRoundUSDC = null;
    refPublicPresaleRoundUSDT = null;
    refPublicPresaleRoundS8B = null;

    constructor(props, context) {
        super(props, context);

        this.refSeedRoundUSDC = React.createRef();
        this.refSeedRoundUSDT = React.createRef();
        this.refSeedRoundS8B = React.createRef();

        this.refStrategicRoundUSDC = React.createRef();
        this.refStrategicRoundUSDT = React.createRef();
        this.refStrategicRoundS8B = React.createRef();

        this.refPublicPresaleRoundUSDC = React.createRef();
        this.refPublicPresaleRoundUSDT = React.createRef();
        this.refPublicPresaleRoundS8B = React.createRef();
    }

    async componentDidMount() {
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

        let seedRoundS8BInUSD = null;
        let strategicRoundS8BInUSD = null;
        let publicPresaleRoundS8BInUSD = null;
        let ethInUSD = null;
        let usdtInUSD = null;
        let usdcInUSD = null;

        await fetch("/localdb/funds-raising-status.json")
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                this.setState({
                    seedPresaleRound: {
                        tokenPriceText: json['seed-presale-round']['token-price-text'],
                        currentStatus: json['seed-presale-round']['current-status'],
                        status: json['seed-presale-round']['status'],
                        statusText: json['seed-presale-round']['status-text'],
                        raisedText: json['seed-presale-round']['raised-text']
                    },
                    strategicPresaleRound: {
                        tokenPriceText: json['strategic-presale-round']['token-price-text'],
                        currentStatus: json['strategic-presale-round']['current-status'],
                        status: json['strategic-presale-round']['status'],
                        statusText: json['strategic-presale-round']['status-text'],
                        raisedText: json['strategic-presale-round']['raised-text']
                    },
                    publicPresaleRound: {
                        tokenPriceText: json['public-presale-round']['token-price-text'],
                        currentStatus: json['public-presale-round']['current-status'],
                        status: json['public-presale-round']['status'],
                        statusText: json['public-presale-round']['status-text'],
                        raisedText: json['public-presale-round']['raised-text']
                    }
                })
            }).catch(reason => {

            })

        await fetch("/localdb/funds-raising-rounds.json")
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                seedRoundS8BInUSD = json.seedRoundPrice;
                strategicRoundS8BInUSD = json.strategicRoundPrice;
                publicPresaleRoundS8BInUSD = json.publicPresaleRoundPrice;
                ethInUSD = json.ethInUSD;
                usdtInUSD = json.usdtInUSD;
                usdcInUSD = json.usdcInUSD;
            }).catch(reason => {

            })

        this.setState({
            isMobile: isMobile,
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,

            accounts: metamaskConfiguration?.accounts || null,
            balance: metamaskConfiguration?.balance || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),

            seedRoundS8BInUSD: seedRoundS8BInUSD,
            strategicRoundS8BInUSD: strategicRoundS8BInUSD,
            publicPresaleRoundS8BInUSD: publicPresaleRoundS8BInUSD,
            ethInUSD: ethInUSD,
            usdtInUSD: usdtInUSD,
            usdcInUSD: usdcInUSD

        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.props.metamaskConfiguration) !== JSON.stringify(prevProps.metamaskConfiguration)) {
            let metamaskConfiguration = null;
            if (this.props?.metamaskConfiguration) {
                metamaskConfiguration = JSON.parse(this.props.metamaskConfiguration);
            }

            this.setState({
                //provider: provider,
                //isMetaMaskSupported: isMetaMaskSupported,

                accounts: metamaskConfiguration?.accounts || null,
                balance: metamaskConfiguration?.balance || null,
                loginStatus: metamaskConfiguration?.loginStatus || null,
                chainId: metamaskConfiguration?.chainId || null,

            }, () => {
                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                }
            });
        }
    }

    loginMetaMask = async () => {
        let chainId = null;
        try {
            chainId = await window.ethereum.request({
                method: "eth_chainId",
                params: []
            })

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

                window.ethereum.on('accountsChanged', this.accountsChanged);
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
        //console.log(chainId);
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

    sendStrategicFunds = async () => {

        let playerAddress = this.state.accounts[0];

        //if transfer is USDC
        if (this.refStrategicRoundUSDC.current.value.length > 0) {

            let usdcContract = new this.state.web3Instance.eth.Contract(config.USDC_TOKEN_ABI, config.TOKEN_ADDRESSES[config.DEFAULT_CHAIN].USDC, { from: playerAddress, gas: 10_000_000 })

            let decimals = await usdcContract.methods.decimals(playerAddress)
                .call({
                    from: playerAddress
                });
            /*.then((response) => {
                console.log("PLAYER ADDRESS USDC DECIMALS:");
                console.log(response);
            });*/

            if (config.DEBUG_CONSOLE) {
                console.log("PLAYER ADDRESS USDC DECIMALS:");
                console.log(decimals);
            }

            /*
            usdcContract.methods.balanceOf(playerAddress)
                .call({
                    from: playerAddress
                })
                .then((response) => {

                    console.log("PLAYER ADDRESS USDC BALANCE:");
                    console.log(response);
                    console.log(ethers.formatUnits(response, 6));
                });
            */

            //console.log(usdcContract);

            let tokenAmount = this.refStrategicRoundUSDC.current.value;

            if (config.DEBUG_CONSOLE) {
                console.log(ethers.parseUnits(tokenAmount, decimals));
            }

            await usdcContract.methods.approve(playerAddress, ethers.parseUnits(tokenAmount, decimals))
                .send({
                    from: playerAddress,
                    gas: 1_000_000
                })
                .then(async (response) => {
                    if (config.DEBUG_CONSOLE) {
                        console.log("APPROVE ACTION RESPONSE");
                        console.log(response);
                    }

                    await usdcContract.methods.transferFrom(playerAddress, config.RECEIVER_TOKEN_ADDRESSES[config.DEFAULT_CHAIN].STRATEGIC, ethers.parseUnits(tokenAmount, decimals))
                        .send({
                            from: playerAddress,
                            gas: 1_000_000
                        })
                        .then((response) => {
                            if (config.DEBUG_CONSOLE) {
                                console.log("TRANSFER FROM ACTION RESPONSE");
                                console.log(response);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                        ;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        //if transfer is USDTs
        if (this.refStrategicRoundUSDT.current.value.length > 0) {

            //if (config.ENVIRONMENT_SITE === "LIVE") return;

            let usdtContract = new this.state.web3Instance.eth.Contract(config.USDT_TOKEN_ABI, config.TOKEN_ADDRESSES[config.DEFAULT_CHAIN].USDT, { from: playerAddress, gas: 10_000_000 })

            let decimals = await usdtContract.methods.decimals(playerAddress)
                .call({
                    from: playerAddress
                });
            /*.then((response) => {
                console.log("PLAYER ADDRESS USDT DECIMALS:");
                console.log(response);
            });*/

            if (config.DEBUG_CONSOLE) {
                console.log("PLAYER ADDRESS USDT DECIMALS:");
                console.log(decimals);
            }

            /*
            usdtContract.methods.balanceOf(playerAddress)
                .call({
                    from: playerAddress
                })
                .then((response) => {

                    console.log("PLAYER ADDRESS USDT BALANCE:");
                    console.log(response);
                    console.log(ethers.formatUnits(response, 6));
                });
            */

            //console.log(usdtContract);

            let tokenAmount = this.refStrategicRoundUSDT.current.value;

            if (config.DEBUG_CONSOLE) {
                console.log(ethers.parseUnits(tokenAmount, decimals));
            }

            await usdtContract.methods.approve(playerAddress, ethers.parseUnits(tokenAmount, decimals))
                .send({
                    from: playerAddress,
                    gas: 1_000_000
                })
                .then(async (response) => {
                    if (config.DEBUG_CONSOLE) {
                        console.log("APPROVE ACTION RESPONSE");
                        console.log(response);
                    }

                    await usdtContract.methods.transferFrom(playerAddress, config.RECEIVER_TOKEN_ADDRESSES[config.DEFAULT_CHAIN].STRATEGIC, ethers.parseUnits(tokenAmount, decimals))
                        .send({
                            from: playerAddress,
                            gas: 1_000_000
                        })
                        .then((response) => {
                            if (config.DEBUG_CONSOLE) {
                                console.log("TRANSFER FROM ACTION RESPONSE");
                                console.log(response);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                        ;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render = () => {
        return (
            <section className="funds-raising-rounds">
                <div className="section">

                    <div className="header-section">
                        <h2 className="title">
                            S8B GAMBLEFI PLATFORM
                        </h2>
                    </div>

                    <p className="large-description">
                        S8BGambleFi is the core platform for decentralized applications that provide cryptocurrency-based betting services.
                        <br />
                        It represents the shift towards integrating online gambling onto the blockchain, targeting two user groups: traditional casino players and DeFi traders.
                        <br />
                        Platform enhances the experience through rewards, benefits, and improved transparency and fairness, while overcoming numerous challenges traditionally faced by both players and casino operators.
                    </p>

                    <p className="large-description">
                        Additionally, S8B token owners are entitled to dividends as a form of reward, providing passive income through the platform’s utility.
                    </p>

                    <div className="connect-with-us">

                        <h2 className="title">
                            Connect with us
                        </h2>

                        <div className="list-channels">
                            <a href="https://t.me/officialchat888bits" className="item">
                                <img src="/pictures/connect-with-us/telegram.svg" alt="Telegram" loading="lazy" />
                                <span>
                                    Telegram
                                </span>
                            </a>
                            <a href="http://twitter.com/BITS888" className="item">
                                <img src="/pictures/connect-with-us/twitter.svg" alt="Twitter" loading="lazy" />
                                <span>
                                    Twitter
                                </span>
                            </a>
                            <a href="https://docs.888bits.com" className="item">
                                <img src="/pictures/connect-with-us/gitbook.svg" alt="Gitbook" loading="lazy" />
                                <span>
                                    Gitbook
                                </span>
                            </a>
                            <a href="https://s8b.888bits.com/static/pdf/s8b-pitchdeck.pdf" className="item">
                                <img src="/pictures/connect-with-us/pitch-deck.svg" alt="Pitch Deck" loading="lazy" />
                                <span>
                                    Pitch Deck
                                </span>
                            </a>
                            <a href="https://s8b.888bits.com/static/pdf/s8b-whitepaper.pdf" className="item">
                                <img src="/pictures/connect-with-us/whitepaper.svg" alt="WhitePaper" loading="lazy" />
                                <span>
                                    Whitepaper
                                </span>
                            </a>
                        </div>
                    </div>

                    <hr />
                    <div className="header-section">
                        <h2 className="title">
                            Funds Raising Rounds
                        </h2>
                    </div>
                    <hr />
                    <p className="description">
                        We, open an exclusive opportunity to purchase tokens at a discounted rate before they are available to the wider public (TGE).
                        <br />
                        This early access allows participants to become involved in a new project at its nascent stage, ahead of the official coin/token launch
                        where the general public can invest.
                        <br />
                        As exclusive means granting early access privileges.
                        <br />
                        Engaging in a pre-sale enables investors to acquire tokens at a preferential 'early-bird' price, prior to their public release.
                    </p>

                    <p className="description">
                        Each phase of investment has its unique terms and benefits, tailored to suit the diverse needs and contributions of our investors.
                        <br />
                        On this page, you can track the current investment totals, remaining tokens available for each round, and the progress towards our next milestones.
                        <br />
                        By investing in our pre-sale, you are not just buying tokens; you are becoming a pivotal part of a community that shapes the future of our project.
                        <br />
                        Join us in this exciting venture and be a part of our growth story.
                    </p>

                    <p className="restriction-description">
                        Tokens purchased during the presale rounds are subject to a various cliff and vesting schedules.
                        <br />
                        Immediately following the Token Generation Event (TGE), 25.81% of total supply are released to their respective holders,
                        <br />
                        the remaining are gradually distributed according to a predetermined cliff and vesting schedule depends on investment seed.
                    </p>

                    <p className="description-2">
                        For public round presale, 50% will be released at TGE, with vesting of 1 months.
                        <br />
                        For strategic round presale, 23% will be released at TGE, with vesting of 3 months.
                        <br />
                        For seed round presale, 18% will be released at TGE, with vesting of 5 months.
                    </p>

                    <hr />

                </div>

                <div className="seed-section">

                    <div className="realtime-statistic-section seed-presale-round">
                        <div className="content">
                            <div className="message-status">
                                {this.state.seedPresaleRound.tokenPriceText}
                            </div>
                            <div className="current-status">
                                {this.state.seedPresaleRound.currentStatus}
                            </div>

                            <div className={"token-status " + this.state.seedPresaleRound.status} dangerouslySetInnerHTML={{ __html: this.state.seedPresaleRound.statusText }}>
                            </div>

                            <div className="raised" dangerouslySetInnerHTML={{ __html: this.state.seedPresaleRound.raisedText }}>
                            </div>
                        </div>
                    </div>

                    <h2 className="title">
                        Seed round: <span className="status finished">Completed.</span>
                    </h2>

                    <div className="round-price">
                        Seed round price
                        <br />
                        1 S8B = ${this.state.seedRoundS8BInUSD}
                    </div>

                    <p className="description-2">
                        This initial phase is designed for early backers who believe in the potential of our project from the outset.
                        <br />
                        Investments made during this round are at the most favorable terms, recognizing the early commitment and trust of our investors.
                    </p>

                    <p className="description-3">
                        The seed presale round is allocated 7% of the total token supply, which amounts to 62,222,222.22 $S8B tokens.
                        <br />
                        In this round, each wallet is limited to a maximum investment of $5,555.56, equivalent to 2,222,220.00 $S8B tokens,
                        representing 0.25% of the total token supply.
                    </p>

                    <div className="message large">
                        Initial seed round is filled.
                    </div>

                    <div className="seed-round-form-closed-text">
                        $S8B - GambleFi Casino Experience - Seed presale round form is closed.
                    </div>

                    <div className="message notice">
                        Prior to the Token Generation Event (TGE), you will be allocated a number of $S8B tokens, accompanied by a 20% bonus in USDC, to be utilized within the casino.
                    </div>

                    <hr />
                    <br />

                    {/*
                    <div className="message small">
                        Enter the amount you are investing in this round in the following currencies
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    seedRoundCurrencyFrom: 'USDC'
                                }, () => {
                                    this.refSeedRoundUSDT.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDC" width={30} height={30} />
                                <div className="name">
                                    USDC
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount"
                                    ref={this.refSeedRoundUSDC}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdcInUSD / this.state.seedRoundS8BInUSD);
                                        this.setState({
                                            seedRoundCurrencyFrom: 'USDC',
                                            seedRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refSeedRoundUSDT.current.value = '';
                                            this.refSeedRoundS8B.current.value = amountInToken;
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>

                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    seedRoundCurrencyFrom: 'USDT'
                                }, () => {
                                    this.refSeedRoundUSDC.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDT" width={30} height={30} />
                                <div className="name">
                                    USDT
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount" ref={this.refSeedRoundUSDT}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdtInUSD / this.state.seedRoundS8BInUSD);

                                        this.setState({
                                            seedRoundCurrencyFrom: 'USDT',
                                            seedRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refSeedRoundUSDC.current.value = '';

                                            this.refSeedRoundS8B.current.value = amountInToken;
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="message small">
                        The amount of $S8B tokens you'll obtain prior to the Token Generation Event (TGE).
                    </div>

                    <div className="receive-currency-section">
                        <div className="enter-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="S8B" width={30} height={30} />
                                <div className="name">
                                    S8B
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Amount to receive" ref={this.refSeedRoundS8B}
                                    onChange={(event) => {
                                        if (this.state?.seedRoundCurrencyFrom === 'USDT' && event.target.value) {

                                            let amount = event.target.value / (this.state.usdtInUSD / this.state.seedRoundS8BInUSD);

                                            this.refSeedRoundUSDC.current.value = '';
                                            this.refSeedRoundUSDT.current.value = amount;
                                        }

                                        if (this.state?.seedRoundCurrencyFrom === 'USDC' && event.target.value) {
                                            let amount = event.target.value / (this.state.usdcInUSD / this.state.seedRoundS8BInUSD);

                                            this.refSeedRoundUSDC.current.value = amount;
                                            this.refSeedRoundUSDT.current.value = '';
                                        }
                                    }}
                                ></input>
                            </div>
                        </div>
                    </div>
                    */}
                </div>

                <div className="seed-section">

                    <div className="realtime-statistic-section strategic-presale-round">
                        <div className="content">
                            <div className="message-status">
                                {this.state.strategicPresaleRound.tokenPriceText}
                            </div>
                            <div className="current-status">
                                <span>
                                    {this.state.strategicPresaleRound.currentStatus}
                                </span>
                            </div>

                            <div className={"token-status " + this.state.strategicPresaleRound.status} dangerouslySetInnerHTML={{ __html: this.state.strategicPresaleRound.statusText }}>
                            </div>

                            <div className="raised" dangerouslySetInnerHTML={{ __html: this.state.strategicPresaleRound.raisedText }}>
                            </div>
                        </div>
                    </div>

                    <h2 className="title">
                        Strategic presale round: <span className="status active">Active</span>
                    </h2>

                    <div className="round-price">
                        Strategic round price
                        <br />
                        1 S8B = ${this.state.strategicRoundS8BInUSD}
                    </div>

                    <p className="description">
                        In this phase, we welcome investors who bring not only capital but also strategic value to our project.
                        <br />
                        This round is ideal for those who can offer expertise, partnerships, or resources that align with our long-term vision.
                    </p>

                    <p className="description-3">
                        The strategic presale round is allocated 9% of the total token supply, which amounts to 79,999,999.92 $S8B tokens.
                        <br />
                        In this round, each wallet is limited to a maximum investment of $5,000.00, equivalent to 1,333,333.00 $S8B tokens,
                        representing 0.15% of the total token supply.
                    </p>

                    <div className="message small">
                        Please enter the amount you are investing in this round in the following currencies
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    strategicRoundCurrencyFrom: 'USDC'
                                }, () => {
                                    this.refStrategicRoundUSDT.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDC" width={30} height={30} />
                                <div className="name">
                                    USDC
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount" ref={this.refStrategicRoundUSDC}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdcInUSD / this.state.strategicRoundS8BInUSD);
                                        this.setState({
                                            strategicRoundCurrencyFrom: 'USDC',
                                            strategicRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refStrategicRoundUSDT.current.value = '';
                                            this.refStrategicRoundS8B.current.value = amountInToken.toFixed(config.getMinimumFractionDigits('S8B'));
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>

                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    strategicRoundCurrencyFrom: 'USDT'
                                }, () => {
                                    this.refStrategicRoundUSDC.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDT" width={30} height={30} />
                                <div className="name">
                                    USDT
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount" ref={this.refStrategicRoundUSDT}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdtInUSD / this.state.strategicRoundS8BInUSD);

                                        this.setState({
                                            strategicRoundCurrencyFrom: 'USDT',
                                            strategicRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refStrategicRoundUSDC.current.value = '';

                                            this.refStrategicRoundS8B.current.value = amountInToken.toFixed(config.getMinimumFractionDigits('S8B'));
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>

                        <div className="receive-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="S8B-red" width={30} height={30} />
                                <div className="name">
                                    S8B
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Amount to receive" ref={this.refStrategicRoundS8B}
                                    onChange={(event) => {
                                        if (this.state?.strategicRoundCurrencyFrom === 'USDT' && event.target.value) {

                                            let amount = event.target.value / (this.state.usdtInUSD / this.state.strategicRoundS8BInUSD);

                                            this.refStrategicRoundUSDC.current.value = '';
                                            this.refStrategicRoundUSDT.current.value = amount.toFixed(config.getMinimumFractionDigits('USDT'));;
                                        }

                                        if (this.state?.strategicRoundCurrencyFrom === 'USDC' && event.target.value) {
                                            let amount = event.target.value / (this.state.usdcInUSD / this.state.strategicRoundS8BInUSD);

                                            this.refStrategicRoundUSDC.current.value = amount.toFixed(config.getMinimumFractionDigits('USDC'));;
                                            this.refStrategicRoundUSDT.current.value = '';
                                        }
                                    }}></input>
                            </div>
                        </div>

                    </div>

                    <div className="button-section">
                        {
                            this.props?.session?.loginStatus ?
                                <button type="button" className="btn send-funds" onClick={(event) => {
                                    this.sendStrategicFunds();
                                }}>SEND FUNDS</button>
                                :
                                <button type="button" className="btn connect-metamask-form" onClick={
                                    (event) => {
                                        this.loginMetaMask();
                                    }
                                }>CONNECT METAMASK</button>
                        }
                    </div>

                    <div className="message notice">
                        Prior to the Token Generation Event (TGE), you will be allocated a number of $S8B tokens, accompanied by a 20% bonus in USDC, to be utilized within the casino.
                    </div>

                    <hr />
                    <br />

                </div>

                <div className="seed-section">
                    <div className="realtime-statistic-section public-presale-round">
                        <div className="content">
                            {/*
                                (!this.state.isMobile && !this.state?.loginStatus && this.state.isMetaMaskSupported) &&
                                <button type="button" className="btn connect-wallet" onClick={(event) => {
                                    this.loginMetaMask();
                                }}>
                                    Connect Wallet
                                </button>
                            */}
                            <div className="message-status">
                                {this.state.publicPresaleRound.tokenPriceText}
                            </div>
                            <div className="current-status">
                                <span>
                                    {this.state.publicPresaleRound.currentStatus}
                                </span>

                            </div>

                            <div className={"token-status " + this.state.publicPresaleRound.status} dangerouslySetInnerHTML={{ __html: this.state.publicPresaleRound.statusText }}>
                            </div>

                            <div className="raised" dangerouslySetInnerHTML={{ __html: this.state.publicPresaleRound.raisedText }}>
                            </div>
                        </div>
                    </div>

                    <h2 className="title">
                        Public presale round: <span className="status not-active">Not Active.</span>
                    </h2>

                    <div className="round-price">
                        Public round price
                        <br />
                        1 S8B = ${this.state.publicPresaleRoundS8BInUSD}
                    </div>

                    <p className="description">
                        This is the final stage before our public launch, open to a broader audience.
                        <br />
                        It's a chance for the general public to invest and be a part of our exciting journey.
                        <br />
                    </p>

                    <p className="description-3">
                        The seed presale round is allocated 10% of the total token supply, which amounts to 88,888,88.88 $S8B tokens.
                        <br />
                        In this round, each wallet is limited to a maximum investment of $4,444.00, equivalent to 8.888,888.88 $S8B tokens, representing 0.10% of the total token supply.
                    </p>

                    <hr />

                    <div className="message small">
                        Please enter the amount you are investing in this round in the following currencies
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    publicPresaleRoundCurrencyFrom: 'USDC'
                                }, () => {
                                    this.refPublicPresaleRoundUSDT.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDC" width={30} height={30} />
                                <div className="name">
                                    USDC
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount" ref={this.refPublicPresaleRoundUSDC}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdcInUSD / this.state.publicPresaleRoundS8BInUSD);
                                        this.setState({
                                            publicPresaleRoundCurrencyFrom: 'USDC',
                                            publicPresaleRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refPublicPresaleRoundUSDT.current.value = '';
                                            this.refPublicPresaleRoundS8B.current.value = amountInToken.toFixed(config.getMinimumFractionDigits('S8B'));
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>

                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    publicPresaleRoundCurrencyFrom: 'USDT'
                                }, () => {
                                    this.refPublicPresaleRoundUSDC.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="USDT" width={30} height={30} />
                                <div className="name">
                                    USDT
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount" ref={this.refPublicPresaleRoundUSDT}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.state.usdtInUSD / this.state.publicPresaleRoundS8BInUSD);

                                        this.setState({
                                            publicPresaleRoundCurrencyFrom: 'USDT',
                                            publicPresaleRoundS8BAmount: amountInToken,
                                        }, () => {
                                            this.refPublicPresaleRoundUSDC.current.value = '';

                                            this.refPublicPresaleRoundS8B.current.value = amountInToken.toFixed(config.getMinimumFractionDigits('S8B'));
                                        });

                                    }}></input>
                            </div>
                        </div>

                        <div className="receive-amount">
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="S8B-red" width={30} height={30} />
                                <div className="name">
                                    S8B
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Amount to receive" ref={this.refPublicPresaleRoundS8B}
                                    onChange={(event) => {
                                        if (this.state?.publicPresaleRoundCurrencyFrom === 'USDT' && event.target.value) {

                                            let amount = event.target.value / (this.state.usdtInUSD / this.state.publicPresaleRoundS8BInUSD);

                                            this.refPublicPresaleRoundUSDC.current.value = '';
                                            this.refPublicPresaleRoundUSDT.current.value = amount.toFixed(config.getMinimumFractionDigits('S8B'));
                                        }

                                        if (this.state?.publicPresaleRoundCurrencyFrom === 'USDC' && event.target.value) {
                                            let amount = event.target.value / (this.state.usdcInUSD / this.state.publicPresaleRoundS8BInUSD);

                                            this.refPublicPresaleRoundUSDC.current.value = amount.toFixed(config.getMinimumFractionDigits('S8B'));
                                            this.refPublicPresaleRoundUSDT.current.value = '';
                                        }
                                    }}></input>
                            </div>
                        </div>

                    </div>

                    <div className="button-section">
                        {
                            this.props?.session?.loginStatus ?
                                null
                                :
                                <button type="button" className="btn connect-metamask-form" onClick={
                                    (event) => {
                                        this.loginMetaMask();
                                    }
                                }>CONNECT METAMASK</button>
                        }
                    </div>

                    <hr />
                    <br />

                </div>

            </section>
        );
    }
}

const mapStateToProps = state => {

    const { session } = state.session;
    const { metamaskConfiguration } = state.metamaskConfiguration;
    const { accountInformation } = state.accountInformation;

    return {
        session,
        metamaskConfiguration,
        accountInformation,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loginPlayerAction,
        logoutPlayerAction,

        setMetamaskConfigurationAction,
        deleteMetamaskConfigurationAction,

        setAccountInformationAction,
        deleteAccountInformationAction,
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(FundsRaisingRounds));

export default hoc;