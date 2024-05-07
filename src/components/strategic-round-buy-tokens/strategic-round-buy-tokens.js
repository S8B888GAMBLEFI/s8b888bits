import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "gatsby-plugin-react-intl"
import Web3 from "web3";
import * as config from "../../configuration/Config";
import detectEthereumProvider from "@metamask/detect-provider";
import {
    STAKE_TOKEN_ADDRESSES, STAKE_TOKEN_ABI,
    STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESSES
} from "../../configuration/Config";
import { setMetamaskConfigurationAction, deleteMetamaskConfigurationAction } from "../../redux/actions/metamaskConfiguration/MetamaskConfigurationActions";
import { ethers } from "ethers";
import WalletCryptoCurrencyIcon from "../currency-icon/wallet-crypto-currency-icon";

class StrategicRoundBuyTokens extends React.Component {

    state = {
        provider: null,
        web3Instance: null,
        accounts: null,
        balance: null,
        chainId: null,
        loginStatus: null,

        strategicRoundCurrencyFrom: 'USDC',
        strategicRoundS8BAmount: null,

        strategicPresaleRound: {
            tokenPriceText: "",
            currentStatus: "",
            status: "",
            statusText: "",
            raisedText: ""
        },
    }

    static propTypes = {
        metamaskConfiguration: PropTypes.any,

        setMetamaskConfigurationAction: PropTypes.func,
        deleteMetamaskConfigurationAction: PropTypes.func,

        setSubmenuDialogStatusAction: PropTypes.func,
        deleteSubmenuDialogStatusAction: PropTypes.func,
    }

    refStrategicRoundUSDC = null;
    refStrategicRoundUSDT = null;
    refStrategicRoundS8B = null;

    s8b_token_contract_address = "0xaCf7501e653f127345Df1a4EacdF663FCB1DF292";

    s8b_token_contract_abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"_rewardsWallet","type":"address"},{"internalType":"address","name":"_teamWallet","type":"address"},{"internalType":"address[]","name":"whitelist","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ExceedsMaxTxAmount","type":"error"},{"inputs":[],"name":"ExceedsMaxWalletAmount","type":"error"},{"inputs":[],"name":"InvalidConfiguration","type":"error"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"}],"name":"InvalidTransfer","type":"error"},{"inputs":[],"name":"NotWhitelisted","type":"error"},{"inputs":[],"name":"TradingNotEnabled","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"FeesEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minTokensBeforeSwap","type":"uint256"}],"name":"MinTokensBeforeSwapUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensAutoLiq","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethAutoLiq","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapAndLiquifyEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"UpdateFeeWallet","type":"event"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"addMoreToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_user","type":"address[]"},{"internalType":"uint256[]","name":"_amount","type":"uint256[]"}],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"blacklistMany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidityBuy","type":"uint256"},{"internalType":"uint256","name":"liquiditySell","type":"uint256"},{"internalType":"uint256","name":"rewardsBuy","type":"uint256"},{"internalType":"uint256","name":"rewardsSell","type":"uint256"},{"internalType":"uint256","name":"teamBuy","type":"uint256"},{"internalType":"uint256","name":"teamSell","type":"uint256"}],"name":"changeFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"beneficiaries","type":"address[]"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"createLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devFeeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devSellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"excludeManyFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"excludeManyFromMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"contract S8BFeeWallet","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCirculatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isTradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isWhitelistEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"launch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"launchedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFeeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquiditySellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"locks","outputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFeeOnSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFeeReduced","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFeeRemoved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofFeeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofNFT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proofWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"replenishApprovals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"restrictWhales","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsFeeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsSellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAMM","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setExcludedFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setExcludedFromMaxTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTxAmt","type":"uint256"}],"name":"setMaxTxAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWalletSize","type":"uint256"}],"name":"setMaxWalletSize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setRestrictWhalesEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setSwapAtAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setTradingEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapping","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamFeeTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamSellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBuyFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSellFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateFeeWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"updateProofAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateProofWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateRewardsWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStaking","type":"address"}],"name":"updateStakingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"updateTeamWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_whitelistPeriod","type":"uint256"}],"name":"updateWhitelistPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"isExcludedFromFees","type":"bool"},{"internalType":"bool","name":"isExcludedMaxTransactionAmount","type":"bool"},{"internalType":"bool","name":"isBlacklisted","type":"bool"},{"internalType":"bool","name":"isWhitelisted","type":"bool"},{"internalType":"bool","name":"isAMM","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawStuckTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]`);

    usdc_token_contract_address = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

    usdc_token_contract_abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]`);


    constructor(props, context) {
        super(props, context);

        this.refStrategicRoundUSDC = React.createRef();
        this.refStrategicRoundUSDT = React.createRef();
        this.refStrategicRoundS8B = React.createRef();

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

        let strategicRoundS8BInUSD = null;
        let ethInUSD = null;
        let usdtInUSD = null;
        let usdcInUSD = null;

        await fetch("/localdb/funds-raising-status.json")
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                this.setState({
                    strategicPresaleRound: {
                        tokenPriceText: json['strategic-presale-round']['token-price-text'],
                        currentStatus: json['strategic-presale-round']['current-status'],
                        status: json['strategic-presale-round']['status'],
                        statusText: json['strategic-presale-round']['status-text'],
                        raisedText: json['strategic-presale-round']['raised-text']
                    }
                })
            }).catch(reason => {

            })

        await fetch("/localdb/funds-raising-rounds.json")
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                strategicRoundS8BInUSD = json.strategicRoundPrice;
                ethInUSD = json.ethInUSD;
                usdtInUSD = json.usdtInUSD;
                usdcInUSD = json.usdcInUSD;
            }).catch(reason => {

            })

        this.setState({
            provider: provider,
            isMetaMaskSupported: isMetaMaskSupported,

            accounts: metamaskConfiguration?.accounts || null,
            balance: metamaskConfiguration?.balance || null,
            loginStatus: metamaskConfiguration?.loginStatus || null,
            chainId: metamaskConfiguration?.chainId || null,
            web3Instance: new Web3(window.ethereum),

            strategicRoundS8BInUSD: strategicRoundS8BInUSD,
            ethInUSD: ethInUSD,
            usdtInUSD: usdtInUSD,
            usdcInUSD: usdcInUSD

        }, () => {
            if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                window.ethereum.on('accountsChanged', this.accountsChanged);
                //window.ethereum.on('chainChanged', this.chainChanged)
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
                accounts: metamaskConfiguration?.accounts || null,
                balance: metamaskConfiguration?.balance || null,
                loginStatus: metamaskConfiguration?.loginStatus || null,
                chainId: metamaskConfiguration?.chainId || null,

            }, () => {
                if (this.state?.accounts && this.state?.balance && this.state?.loginStatus) {
                    window.ethereum.on('accountsChanged', this.accountsChanged);
                    //window.ethereum.on('chainChanged', this.chainChanged)
                }
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

    render = () => {
        return (
            <section className="funds-raising-rounds">
                <div className="seed-section">
                    <h2 className="title">
                        Strategic presale round: Active
                    </h2>

                    <div className="round-price">
                        Strategic round price: 1 S8B = ${this.state.strategicRoundS8BInUSD}
                    </div>

                    <div className="message small">
                        Enter the amount you are investing in this round in the following currencies
                    </div>

                    <div className="check-currency-section">
                        <div className="enter-amount" onClick={
                            (event) => {
                                this.setState({
                                    strategicRoundCurrencyFrom: 'USDC'
                                }, () => {
                                    //this.refStrategicRoundUSDT.current.value = '';
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
                                            //this.refStrategicRoundUSDT.current.value = '';
                                            this.refStrategicRoundS8B.current.value = amountInToken.toFixed(config.getMinimumFractionDigits('S8B'));
                                        });

                                    }}
                                ></input>
                            </div>
                        </div>

                        {/*
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
                        */}

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
                                <input type="number" placeholder="Amount to receive" ref={this.refStrategicRoundS8B}
                                    onChange={(event) => {
                                        if (this.state?.strategicRoundCurrencyFrom === 'USDT' && event.target.value) {

                                            let amount = event.target.value / (this.state.usdtInUSD / this.state.strategicRoundS8BInUSD);

                                            this.refStrategicRoundUSDC.current.value = '';
                                            //this.refStrategicRoundUSDT.current.value = amount.toFixed(config.getMinimumFractionDigits('USDT'));;
                                        }

                                        if (this.state?.strategicRoundCurrencyFrom === 'USDC' && event.target.value) {
                                            let amount = event.target.value / (this.state.usdcInUSD / this.state.strategicRoundS8BInUSD);

                                            this.refStrategicRoundUSDC.current.value = amount.toFixed(config.getMinimumFractionDigits('USDC'));;
                                            //this.refStrategicRoundUSDT.current.value = '';
                                        }
                                    }}></input>
                            </div>
                        </div>
                    </div>

                    <div className="button-section">
                        <button type="button" className="btn buy-tokens" onClick={async (event) => {
                            event.preventDefault();

                            let usdcAmount = this.refStrategicRoundUSDC.current.value;
                            let tokenAmount = this.refStrategicRoundS8B.current.value;

                            //console.log("BUY TOKENS");

                            if (this.state?.loginStatus && tokenAmount > 0 && this.state?.accounts?.[0]) {

                                let playerAddress = this.state.accounts[0];


                                if (config.DEBUG_CONSOLE) {
                                    console.log("player address=" + playerAddress);
                                }

                                //console.log(JSON.parse(this.s8b_token_contract_abi));

                                let s8bTokenContract = new this.state.web3Instance.eth.Contract(this.s8b_token_contract_abi, this.s8b_token_contract_address, { from: playerAddress, gas: 10_000_000 });

                                if (config.DEBUG_CONSOLE) {
                                    console.log(await window.ethereum.request({
                                        method: 'eth_requestAccounts',
                                    }));
                                }

                                let owner = await s8bTokenContract.methods.owner()
                                    .call({
                                        from: this.s8b_token_contract_address,
                                        gas: 1_000_000
                                    });

                                if (config.DEBUG_CONSOLE) {
                                    console.log("OWNER = " + owner);
                                }

                                let devWallet = await s8bTokenContract.methods.devWallet()
                                    .call({
                                        from: this.s8b_token_contract_address,
                                        gas: 1_000_000
                                    });

                                if (config.DEBUG_CONSOLE) {
                                    console.log("devWallet = " + devWallet);
                                }

                                let decimals = await s8bTokenContract.methods.decimals()
                                    .call({
                                        from: this.s8b_token_contract_address,
                                        gas: 1_000_000
                                    });

                                if (config.DEBUG_CONSOLE) {
                                    console.log("decimals=" + decimals);
                                }


                                await s8bTokenContract.methods.approve(this.s8b_token_contract_address, ethers.parseUnits(tokenAmount, decimals))
                                    .send({
                                        from: this.s8b_token_contract_address,
                                        gas: 1_000_000
                                    })
                                    .then(async (response) => {

                                        if (config.DEBUG_CONSOLE) {
                                            console.log(response);
                                        }

                                        await s8bTokenContract.methods.transferFrom(owner, playerAddress, ethers.parseUnits(tokenAmount, decimals))
                                            .send({
                                                from: owner,
                                                gas: 1_000_000
                                            })
                                            .then((response) => {
                                                if (config.DEBUG_CONSOLE) {
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

                                /*
                                await s8bTokenContract.methods.transfer(playerAddress, ethers.parseEther(tokenAmount))
                                    .send({
                                        from: playerAddress,
                                        gas: 1_000_000
                                    })
                                    .then((response) => {
                                        console.log(response);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    })
                                    ;
                                */

                                /*
                                await s8bTokenContract.methods.approve(this.s8b_token_contract_address, ethers.parseEther(tokenAmount))
                                    .send({
                                        from: this.s8b_token_contract_address,
                                        gas: 1_000_000
                                    })
                                    .then(async (response) => {
                                        console.log(response);
 
                                        await s8bTokenContract.methods.transferFrom(this.s8b_token_contract_address, playerAddress, ethers.parseEther(tokenAmount))
                                            .send({
                                                from: this.s8b_token_contract_address,
                                                gas: 1_000_000
                                            })
                                            .then((response) => {
                                                console.log(response);
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            })
                                            ;
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                */

                            }

                        }
                        }>
                            Buy Tokens
                        </button>
                    </div>
                </div>
            </section>
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(injectIntl(StrategicRoundBuyTokens));

export default hoc;