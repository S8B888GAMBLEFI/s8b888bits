// IMPORT PACKAGE REFERENCES
import { createStore, applyMiddleware } from 'redux';
import { compose } from 'redux';
// IMPORT MIDDLEWARE
import { default as thunk } from 'redux-thunk';
import promise from 'redux-promise-middleware';
// IMPORT REDUCERS
import { AppReducer } from '../reducers/AppReducer';
import CryptoJS from 'crypto-js';
import * as config from "../../configuration/Config";
// CONFIGURE STORE

let appState = {};

if (typeof window !== 'undefined' && window.sessionStorage) {

    if (config.ENCRYPT_APP_STATE_TO_STORAGE) {
        let data = window.sessionStorage.getItem(config.APP_STATE_TO_STORAGE_NAME) ? window.sessionStorage.getItem(config.APP_STATE_TO_STORAGE_NAME) : null;
        if (data !== null) {
            let data_decrypted = CryptoJS.AES.decrypt(data, config.ENCRYPT_APP_STATE_TO_STORAGE_SECRET_KEY);
            data_decrypted = data_decrypted.toString(CryptoJS.enc.Utf8);
            appState = JSON.parse(data_decrypted) ? JSON.parse(data_decrypted) : {};
        } else {
            appState = {};
        }
    } else {
        const data = window.sessionStorage.getItem(config.APP_STATE_TO_STORAGE_NAME);
        appState = JSON.parse(data) ? JSON.parse(data) : {};
    }
}

let composeEnhancers;

if (typeof window !== 'undefined') {
    composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
} else {
    composeEnhancers = compose;
}

let appStore = createStore(AppReducer, appState, composeEnhancers(
    applyMiddleware(thunk, promise)
));

appStore.subscribe(() => {

    if (appStore.getState() && appStore.getState() != null) {
        if (config.ENCRYPT_APP_STATE_TO_STORAGE) {
            let data = JSON.stringify(appStore.getState());
            let data_encrypted = CryptoJS.AES.encrypt(data, config.ENCRYPT_APP_STATE_TO_STORAGE_SECRET_KEY);

            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(config.APP_STATE_TO_STORAGE_NAME, data_encrypted.toString());
            }
        } else {
            const data = JSON.stringify(appStore.getState());
            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem(config.APP_STATE_TO_STORAGE_NAME, data);
            }
        }
    }
});

export const createAppStore = () => {
    return appStore;
};