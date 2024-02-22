
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