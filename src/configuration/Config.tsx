
//UAT

export const ENVIRONMENT_SITE = 'UAT';
export const IS_DEV_ENV = false;
export const REST_SERVICE_BASE_URL = "https://uat.888bits.com/api/rest/index";
export const BASE_URL = "https://uat.s8b.888bits.com/";
export const CASINO_BASE_URL = "https://uat.888bits.com/";
export const internetGroupId = '747872399';

//local or session storage protection - player session in web site
export const ENCRYPT_APP_STATE_TO_STORAGE = true;
export const ENCRYPT_APP_STATE_TO_STORAGE_SECRET_KEY = 'ultraplus';
export const APP_STATE_TO_STORAGE_NAME = 'uat_presale_888bits_com';
//GDPR cookie name for privacy policy modal dialog
export const GDPR_COOKIE_NAME = 'GDPR_UAT_PRESALE_888BITS_COM';

export const cryptoCurrencyList = ['LTC', 'LTCT', 'BTC', 'ETH', 'ZEC', 'XMR', 'USDT', 'DOGE', 'MBTC', 'METH', 'μBTC', 'μETH', 'mBTC', 'uBTC', 'mETH', 'BCH', 'USDTT', 'USDTE', 'S8B'];

export const getMinimumFractionDigits = (currency: string) => {
    if (currency) {
        let testCurrency = currency.toUpperCase();

        if (testCurrency === 'USDT'.toUpperCase()) {
            return 2;
        }
        if (testCurrency === 'USDTE'.toUpperCase()) {
            return 2;
        }
        if (testCurrency === 'USDTT'.toUpperCase()) {
            return 2;
        }
        if (testCurrency === 'S8B'.toUpperCase()) {
            return 2;
        }
        if (testCurrency === 'DOGE'.toUpperCase()) {
            return 4;
        }
        if (testCurrency === 'BCH'.toUpperCase()) {
            return 7;
        }
        if (testCurrency === 'LTC'.toUpperCase()) {
            return 7;
        }
        if (testCurrency === 'LTCT'.toUpperCase()) {
            return 7;
        }

        if (cryptoCurrencyList.includes(testCurrency)) {
            return 8;
        } else {
            return 2;
        }
    }
    if (currency) {

        if (currency === 'USDT') {
            return 2;
        }
        if (currency === 'USDTE') {
            return 2;
        }
        if (currency === 'USDTT') {
            return 2;
        }
        if (currency === 'S8B') {
            return 2;
        }
        if (currency === 'DOGE') {
            return 4;
        }
        if (currency === 'BCH') {
            return 7;
        }
        if (currency === 'LTC') {
            return 7;
        }
        if (currency === 'LTCT') {
            return 7;
        }

        if (cryptoCurrencyList.includes(currency)) {
            return 8;
        } else {
            return 2;
        }
    }
}

export const casinoName = '888bits';
export const casinoDomainName = '888bits.com';

export const affiliateName = '888bits.com';
export const whiteLabelName = '888bits';
export const siteNameForGame = '888bits.com';
export const defaultCurrencyName = 'USDTE';
export const defaultCurrencyId = '007';
export const defaultSupportMail = 'support@888bits.com';

export const HOME_PAGE = '/';

//debug general calls in console
export const DEBUG_CONSOLE = false;
//clear console debug
export const CLEAR_CONSOLE_DEBUG = false;

//jwt protected rest services
export const USE_JWT_IN_RESPONSE = true;
export const JWT_SECRET_KEY = 'ultraplus';

//Limit reports in past 6 months
export const LIMIT_REPORTS_PAST = 6;

export const MINIMUM_FRACTION_DIGITS = 6;

export const APP_VERSION = "1.0.1";

export const CHAINS = {
    "MAINNET": {
        hex: "0x1",
        dec: 1,
    },
    "SEPOLIA": {
        hex: "0xAA36A7",
        dec: 1115511
    },
    "GOERLI": {
        hex: "0x5",
        dec: 5
    }
}

export const STAKE_TOKEN_ADDRESSES = "0xA2DC2395aEB8288B084D63837Ad51774BCB4a903";

export const STAKE_TOKEN_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [], "name": "EIP712DomainChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "flatFee", "type": "uint256" }], "name": "FlatPlatformFeeUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "platformFeeBps", "type": "uint256" }], "name": "PlatformFeeInfoUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "enum IPlatformFee.PlatformFeeType", "name": "feeType", "type": "uint8" }], "name": "PlatformFeeTypeUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "PrimarySaleRecipientUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "quantityMinted", "type": "uint256" }], "name": "TokensMinted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "signer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "indexed": false, "internalType": "struct ITokenERC20.MintRequest", "name": "mintRequest", "type": "tuple" }], "name": "TokensMintedWithSignature", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "CLOCK_MODE", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32", "name": "pos", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "components": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint224", "name": "votes", "type": "uint224" }], "internalType": "struct ERC20VotesUpgradeable.Checkpoint", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "clock", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractType", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractVersion", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eip712Domain", "outputs": [{ "internalType": "bytes1", "name": "fields", "type": "bytes1" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "version", "type": "string" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "address", "name": "verifyingContract", "type": "address" }, { "internalType": "bytes32", "name": "salt", "type": "bytes32" }, { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "timepoint", "type": "uint256" }], "name": "getPastTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "timepoint", "type": "uint256" }], "name": "getPastVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPlatformFeeInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_defaultAdmin", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_contractURI", "type": "string" }, { "internalType": "address[]", "name": "_trustedForwarders", "type": "address[]" }, { "internalType": "address", "name": "_primarySaleRecipient", "type": "address" }, { "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintWithSignature", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "primarySaleRecipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }], "name": "setContractURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "setPlatformFeeInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_saleRecipient", "type": "address" }], "name": "setPrimarySaleRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "verify", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

export const REWARD_TOKEN_ADDRESSES = "0x464150DEb6A8691c88b69445D551ACDDA9aA7C36";

export const REWARD_TOKEN_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [], "name": "EIP712DomainChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "flatFee", "type": "uint256" }], "name": "FlatPlatformFeeUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "platformFeeBps", "type": "uint256" }], "name": "PlatformFeeInfoUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "enum IPlatformFee.PlatformFeeType", "name": "feeType", "type": "uint8" }], "name": "PlatformFeeTypeUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "PrimarySaleRecipientUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "quantityMinted", "type": "uint256" }], "name": "TokensMinted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "signer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "indexed": false, "internalType": "struct ITokenERC20.MintRequest", "name": "mintRequest", "type": "tuple" }], "name": "TokensMintedWithSignature", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "CLOCK_MODE", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32", "name": "pos", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "components": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint224", "name": "votes", "type": "uint224" }], "internalType": "struct ERC20VotesUpgradeable.Checkpoint", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "clock", "outputs": [{ "internalType": "uint48", "name": "", "type": "uint48" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractType", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractVersion", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eip712Domain", "outputs": [{ "internalType": "bytes1", "name": "fields", "type": "bytes1" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "version", "type": "string" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "address", "name": "verifyingContract", "type": "address" }, { "internalType": "bytes32", "name": "salt", "type": "bytes32" }, { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "timepoint", "type": "uint256" }], "name": "getPastTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "timepoint", "type": "uint256" }], "name": "getPastVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPlatformFeeInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_defaultAdmin", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_contractURI", "type": "string" }, { "internalType": "address[]", "name": "_trustedForwarders", "type": "address[]" }, { "internalType": "address", "name": "_primarySaleRecipient", "type": "address" }, { "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintWithSignature", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "primarySaleRecipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }], "name": "setContractURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "setPlatformFeeInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_saleRecipient", "type": "address" }], "name": "setPrimarySaleRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "verify", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

export const STAKE_CONTRACT_ADDRESSES = "0x254d4D3410BFb45F2269E99aBE73991f00485ff1";

export const STAKE_CONTRACT_ABI = [
    {
        "type": "constructor",
        "name": "",
        "inputs": [
            {
                "type": "address",
                "name": "_nativeTokenWrapper",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ContractURIUpdated",
        "inputs": [
            {
                "type": "string",
                "name": "prevURI",
                "indexed": false,
                "internalType": "string"
            },
            {
                "type": "string",
                "name": "newURI",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "type": "uint8",
                "name": "version",
                "indexed": false,
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RewardTokensDepositedByAdmin",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RewardTokensWithdrawnByAdmin",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RewardsClaimed",
        "inputs": [
            {
                "type": "address",
                "name": "staker",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "rewardAmount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "type": "bytes32",
                "name": "previousAdminRole",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "type": "bytes32",
                "name": "newAdminRole",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "sender",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "sender",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TokensStaked",
        "inputs": [
            {
                "type": "address",
                "name": "staker",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TokensWithdrawn",
        "inputs": [
            {
                "type": "address",
                "name": "staker",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UpdatedMinStakeAmount",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldAmount",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "newAmount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UpdatedRewardRatio",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldNumerator",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "newNumerator",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "oldDenominator",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "newDenominator",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "UpdatedTimeUnit",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldTimeUnit",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "newTimeUnit",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "claimRewards",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "contractType",
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "contractURI",
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": "",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "contractVersion",
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": "",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "depositRewardTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getRewardRatio",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "_numerator",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_denominator",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRewardTokenBalance",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleMember",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "uint256",
                "name": "index",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "member",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleMemberCount",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "count",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getStakeInfo",
        "inputs": [
            {
                "type": "address",
                "name": "_staker",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "_tokensStaked",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_rewards",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTimeUnit",
        "inputs": [],
        "outputs": [
            {
                "type": "uint80",
                "name": "_timeUnit",
                "internalType": "uint80"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "hasRoleWithSwitch",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "type": "address",
                "name": "_defaultAdmin",
                "internalType": "address"
            },
            {
                "type": "string",
                "name": "_contractURI",
                "internalType": "string"
            },
            {
                "type": "address[]",
                "name": "_trustedForwarders",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "_rewardToken",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "_stakingToken",
                "internalType": "address"
            },
            {
                "type": "uint80",
                "name": "_timeUnit",
                "internalType": "uint80"
            },
            {
                "type": "uint256",
                "name": "_rewardRatioNumerator",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_rewardRatioDenominator",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "isTrustedForwarder",
        "inputs": [
            {
                "type": "address",
                "name": "forwarder",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "multicall",
        "inputs": [
            {
                "type": "bytes[]",
                "name": "data",
                "internalType": "bytes[]"
            }
        ],
        "outputs": [
            {
                "type": "bytes[]",
                "name": "results",
                "internalType": "bytes[]"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            {
                "type": "bytes32",
                "name": "role",
                "internalType": "bytes32"
            },
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "rewardToken",
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "rewardTokenDecimals",
        "inputs": [],
        "outputs": [
            {
                "type": "uint16",
                "name": "",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setContractURI",
        "inputs": [
            {
                "type": "string",
                "name": "_uri",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setRewardRatio",
        "inputs": [
            {
                "type": "uint256",
                "name": "_numerator",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_denominator",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setTimeUnit",
        "inputs": [
            {
                "type": "uint80",
                "name": "_timeUnit",
                "internalType": "uint80"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "stake",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "stakers",
        "inputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "uint128",
                "name": "timeOfLastUpdate",
                "internalType": "uint128"
            },
            {
                "type": "uint64",
                "name": "conditionIdOflastUpdate",
                "internalType": "uint64"
            },
            {
                "type": "uint256",
                "name": "amountStaked",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "unclaimedRewards",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stakersArray",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stakingToken",
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stakingTokenBalance",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "stakingTokenDecimals",
        "inputs": [],
        "outputs": [
            {
                "type": "uint16",
                "name": "",
                "internalType": "uint16"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdraw",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawRewardTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "_amount",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "receive",
        "name": "",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    }
];