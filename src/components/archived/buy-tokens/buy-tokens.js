import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";

import WalletCryptoCurrencyIcon from "../currency-icon/wallet-crypto-currency-icon";

class BuyTokens extends React.Component {

    state = {
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,
        loginStatus: null,

        selectedCurrencyFrom: 'ETH',
        tokenAmount: '',

        tokenBalance: null
    }

    static propTypes = {
        metamaskConfiguration: PropTypes.any,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setSubmenuDialogStatusAction: PropTypes.func,
        deleteSubmenuDialogStatusAction: PropTypes.func,
    }

    static defaultProps = {

    }

    privateSaleTokenInUSD = 0.0004;
    listingSaleTokenInUSD = 0.005;
    ethInUSD = 2243.06;
    usdtInUSD = 1.01;
    usdcInUSD = 1.00;

    refEthValue = null;
    refUsdtValue = null;
    refUsdcValue = null;

    refTokenValue = null;

    contractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "ECDSAInvalidSignature",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "length",
                    "type": "uint256"
                }
            ],
            "name": "ECDSAInvalidSignatureLength",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "ECDSAInvalidSignatureS",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "allowance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "ERC2612ExpiredSignature",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "signer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC2612InvalidSigner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "currentNonce",
                    "type": "uint256"
                }
            ],
            "name": "InvalidAccountNonce",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidShortString",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "str",
                    "type": "string"
                }
            ],
            "name": "StringTooLong",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "EIP712DomainChanged",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "permit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "eip712Domain",
            "outputs": [
                {
                    "internalType": "bytes1",
                    "name": "fields",
                    "type": "bytes1"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "version",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "chainId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "verifyingContract",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "salt",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256[]",
                    "name": "extensions",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    contractAddress = '0x9A1eED6d932e60Af15eE997184611Fc79EF3f79E';
    walletAddress = '0x8D520016daeF63195F249D6F72fAe1ea984ed4Ac';

    constructor(props, context) {
        super(props, context);

        this.refEthValue = React.createRef();
        this.refUsdtValue = React.createRef();
        this.refUsdcValue = React.createRef();
        this.refTokenValue = React.createRef();
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

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,

            accounts: metamaskConfiguration?.accounts || null,
            balance: metamaskConfiguration?.balance || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),

        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                window.ethereum.on('chainChanged', this.chainChanged)
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
                    window.ethereum.on('chainChanged', this.chainChanged)
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
                if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia eth network
                    try {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.SEPOLIA.hex
                                }
                            ]
                        });
                    } catch (error) {
                        return;
                    }
                }
            }
            if (config.ENVIRONMENT_SITE === "DEV") {
                if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia eth network
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

            //
            let toAddress = accounts[0];

            let contract = new this.state.web3Instance.eth.Contract(this.contractABI, this.contractAddress, { from: this.walletAddress, gas: 10000000 })

            await contract.methods.balanceOf(toAddress)
                .call({
                    from: this.walletAddress
                })
                .then((response) => {
                    //console.log(response);
                    this.setState({
                        tokenBalance: response
                    })
                })
                .catch((error) => {
                    console.error(error);
                })
                ;

            //

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
                if (chainId !== config.CHAINS.SEPOLIA.hex) { //sepolia
                    try {

                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: config.CHAINS.SEPOLIA.hex
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

    render = () => {
        return (
            <section className="buy-tokens-section">
                <div className="header-section">
                    <div className="title">
                        Buy tokens
                    </div>
                    {
                        (!this.state?.loginStatus && this.state.isMetaMaskSupported) &&
                        <button type="button" className="btn connect-wallet" onClick={(event) => {
                            this.loginMetaMask();
                        }}>
                            Connect Wallet
                        </button>
                    }
                    {
                        (this.state?.loginStatus === true && this.state?.tokenBalance) &&
                        <div>{this.state.tokenBalance.toString()}</div>
                    }
                </div>
                <hr />
                <div className="main-section">
                    <div className="sale-price">
                        Private sale price: 1 $S8B = $0.0004
                    </div>
                    <div className="message">
                        Amount of currency you investing
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    selectedCurrencyFrom: 'ETH'
                                }, () => {
                                    this.refUsdtValue.current.value = '';
                                    this.refUsdcValue.current.value = '';
                                })
                            }
                        }>
                            <div className="currency">
                                <WalletCryptoCurrencyIcon currency="ETH" width={30} height={30} />
                                <div className="name">
                                    ETH
                                </div>
                            </div>
                            <div className="input-amount">
                                <input type="number" placeholder="Enter Amount"
                                    ref={this.refEthValue}
                                    //defaultValue={this.state.ethValue}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.ethInUSD / this.privateSaleTokenInUSD);

                                        this.setState({
                                            selectedCurrencyFrom: 'ETH',
                                            tokenAmount: amountInToken,
                                        }, () => {
                                            this.refUsdtValue.current.value = '';
                                            this.refUsdcValue.current.value = '';

                                            this.refTokenValue.current.value = amountInToken;
                                        });

                                    }}></input>
                            </div>
                        </div>

                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    selectedCurrencyFrom: 'USDT'
                                }, () => {
                                    this.refEthValue.current.value = '';
                                    this.refUsdcValue.current.value = '';
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
                                <input type="number" placeholder="Enter Amount"
                                    ref={this.refUsdtValue}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.usdtInUSD / this.privateSaleTokenInUSD);

                                        this.setState({
                                            selectedCurrencyFrom: 'USDT',
                                            tokenAmount: amountInToken,
                                        }, () => {
                                            this.refEthValue.current.value = '';
                                            this.refUsdcValue.current.value = '';

                                            this.refTokenValue.current.value = amountInToken;
                                        });

                                    }}></input>
                            </div>
                        </div>

                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    selectedCurrencyFrom: 'USDC'
                                }, () => {
                                    this.refEthValue.current.value = '';
                                    this.refUsdtValue.current.value = '';
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
                                    ref={this.refUsdcValue}
                                    onChange={(event) => {
                                        let amountInToken = event.target.value * (this.usdcInUSD / this.privateSaleTokenInUSD);

                                        this.setState({
                                            selectedCurrencyFrom: 'USDC',
                                            tokenAmount: amountInToken,
                                        }, () => {
                                            this.refEthValue.current.value = '';
                                            this.refUsdtValue.current.value = '';

                                            this.refTokenValue.current.value = amountInToken;
                                        });

                                    }}></input>
                            </div>
                        </div>
                    </div>

                    <div className="message">
                        Amount of $S8B you investing
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
                                <input type="number" placeholder="Amount to receive"
                                    //defaultValue={this.state.tokenAmount}
                                    ref={this.refTokenValue}
                                    onChange={(event) => {
                                        if (this.state?.selectedCurrencyFrom === 'ETH' && event.target.value) {

                                            let amount = event.target.value / (this.ethInUSD / this.privateSaleTokenInUSD);

                                            this.refEthValue.current.value = amount;
                                            this.refUsdtValue.current.value = '';
                                            this.refUsdcValue.current.value = '';
                                        }

                                        if (this.state?.selectedCurrencyFrom === 'USDT' && event.target.value) {
                                            let amount = event.target.value / (this.usdtInUSD / this.privateSaleTokenInUSD);

                                            this.refEthValue.current.value = '';
                                            this.refUsdtValue.current.value = amount;
                                            this.refUsdcValue.current.value = '';
                                        }

                                        if (this.state?.selectedCurrencyFrom === 'USDC' && event.target.value) {
                                            let amount = event.target.value / (this.usdcInUSD / this.privateSaleTokenInUSD);

                                            this.refEthValue.current.value = '';
                                            this.refUsdtValue.current.value = '';
                                            this.refUsdcValue.current.value = amount;
                                        }
                                    }}
                                ></input>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn buy-tokens" onClick={async (event) => {

                        let tokenAmount = this.refTokenValue.current.value;

                        if (this.state?.loginStatus && tokenAmount > 0 && this.state?.accounts) {

                            let toAddress = this.state.accounts[0];

                            let contract = new this.state.web3Instance.eth.Contract(this.contractABI, this.contractAddress, { from: this.walletAddress, gas: 10000000 })

                            await contract.methods.balanceOf(this.walletAddress)
                                .call({
                                    from: this.walletAddress
                                })
                                .then((response) => {
                                    //console.log(response);
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                ;

                            await contract.methods.balanceOf(toAddress)
                                .call({
                                    from: this.walletAddress
                                })
                                .then((response) => {
                                    //console.log(response);
                                    this.setState({
                                        tokenBalance: response
                                    })
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                ;


                            let chargeAmount = 0.00002;
                            /*if (this.state.selectedCurrencyFrom === 'ETH') {
                                chargeAmount = this.refEthValue.current.value;
                            }
                            else if (this.state.selectedCurrencyFrom === 'USDT') {
                                
                            }*/


                            await contract.methods.transfer(toAddress, tokenAmount)
                                .send({
                                    from: this.walletAddress,
                                    //value: this.state.web3Instance.utils.toWei(chargeAmount, 'ether')
                                })
                                .then((response) => {
                                    //console.log(response);
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                ;


                            await contract.methods.balanceOf(this.walletAddress)
                                .call({
                                    from: this.walletAddress
                                })
                                .then((response) => {
                                    //console.log(response);
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                ;

                            await contract.methods.balanceOf(toAddress)
                                .call({
                                    from: this.walletAddress
                                })
                                .then((response) => {
                                    //console.log(response);
                                    this.setState({
                                        tokenBalance: response
                                    })
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                ;
                        }
                    }}>
                        Buy tokens
                    </button>

                    <div className="listing-price">
                        Listing price: 1$S8B = $0.005
                    </div>
                </div>
            </section >
        );
    }
}

const mapStateToProps = state => {

    const { metamaskConfiguration } = state.metamaskConfiguration;

    return {
        metamaskConfiguration,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setMetamaskConfigurationAction,
        deleteMetamaskConfigurationAction,
    }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(BuyTokens));

export default hoc;