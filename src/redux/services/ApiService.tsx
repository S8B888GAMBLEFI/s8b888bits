import * as config from '../../configuration/Config';
import CryptoJS from 'crypto-js';
import moment from 'moment';

const getTokenHoldingsForStrategicRoundService = () => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return fetch(config.API_BASE_URL + "get-token-holdings-for-strategic-round", {
        method: 'GET',
        headers: axiosConfig.headers,
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
}

const getExchangePair = (fromCurrency, toCurrency) => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return fetch(config.API_BASE_URL + "get-exchange-pair/fromCurrency/" + fromCurrency + "/toCurrency/" + toCurrency, {
        method: 'GET',
        headers: axiosConfig.headers,
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
}

const saveSignupEmailService = (data) => {

    const dateTime = moment(new Date()).format('DD-MM-yyyy hh:mm:ss');

    let payload = {
        operation: 'save-email',
        email: data.email,
        site: config.BASE_URL
    }

    let payload_hash = {
        operation: 'save-email',
        date_time: dateTime,
        email: data.email,
        site: config.BASE_URL
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'X-HMAC-Value': btoa(CryptoJS.HmacSHA256(JSON.stringify(payload_hash), config.JWT_SECRET_KEY).toString()),
            'X-Date': dateTime,
            'X-Username': config.casinoName
        }
    };

    if (config.USE_JWT_IN_RESPONSE) {
        payload['JWT'] = config.JWT_SECRET_KEY;
        let jwt_token = CryptoJS.SHA1(JSON.stringify(payload)).toString();
        payload['JWT'] = jwt_token;
    }

    return fetch(config.API_BASE_URL + "save-email", {
        method: 'POST',
        headers: axiosConfig.headers,
        body: JSON.stringify(payload)
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            //console.error(error);
            return {
                status: 'NOK',
                message: 'Error in server request'
            };
        });
};

export {
    getTokenHoldingsForStrategicRoundService,
    getExchangePair,
    saveSignupEmailService
};