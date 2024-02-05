// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';

// IMPORT REDUCERS

//import { CookieConsentReducer } from './cookieConsent/CookieConsentReducer';
//import { AuthenticatedPlayerDialogStatusReducer } from './authenticatedPlayerDialog/AuthenticatedPlayerDialogReducer';
import { LoggedInSubmenuDialogStatusReducer } from './loggedInSubmenuDialog/LoggedInSubmenuDialogReducer';
import { MetamaskConfigurationReducer } from './metamaskConfiguration/MetamaskConfigurationReducer';
import { SubmenuDialogStatusReducer } from './submenuDialog/SubmenuDialogReducer';
// EXPORT APP REDUCER

export const AppReducer = combineReducers({

    //cookieConsent: CookieConsentReducer,
    //authenticatedPlayerDialogStatus: AuthenticatedPlayerDialogStatusReducer,
    loggedInSubmenuDialogStatus: LoggedInSubmenuDialogStatusReducer,
    metamaskConfiguration: MetamaskConfigurationReducer,
    submenuDialogStatus: SubmenuDialogStatusReducer,
});