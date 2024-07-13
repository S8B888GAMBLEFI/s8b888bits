import * as config from '../../configuration/Config';
import CryptoJS from 'crypto-js';
import moment from 'moment';

const getNormalTransactionsByAddress = (address) => {

    let payload = {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: "0",
        endblock: "99999999",
        page: "1",
        offset: "15",
        sort: 'desc',
        apikey: config.ETHERSCAN_API_KEY_888bits,
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return fetch(config.ETHERSCAN_API_URL + "?" + new URLSearchParams(payload).toString(), {
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
};

// https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdAC17F958D2ee523a2206206994597C13D831ec7&apikey=FN7DR9TIGCSWHUIECFR8A8BARUB1G3U56D&page=1&offset=100&address=0x3257494ec2518E600f429AE5E19D231869B78350&tag=latest

const getTokenBalanceForAddress = (address, contractAddress) => {

    let payload = {
        module: 'account',
        action: 'tokenbalance',
        contractaddress: contractAddress,
        address: address,
        tag: "latest",
        apikey: config.ETHERSCAN_API_KEY_888bits,
    }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return fetch(config.ETHERSCAN_API_URL + "?" + new URLSearchParams(payload).toString(), {
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


export {
    getNormalTransactionsByAddress,
    getTokenBalanceForAddress,
};