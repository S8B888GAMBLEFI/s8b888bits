// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';

// IMPORT REDUCERS

import { SessionReducer } from './session/SessionReducer';
import { LoggedInSubmenuDialogStatusReducer } from './loggedInSubmenuDialog/LoggedInSubmenuDialogReducer';
import { MetamaskConfigurationReducer } from './metamaskConfiguration/MetamaskConfigurationReducer';
import { PhantomConfigurationReducer } from './phantomConfiguration/PhantomConfigurationReducer';
import { SubmenuDialogStatusReducer } from './submenuDialog/SubmenuDialogReducer';
import { AccountInformationReducer } from './accountInformation/AccountInformationReducer';
// EXPORT APP REDUCER

export const AppReducer = combineReducers({

    session: SessionReducer,
    loggedInSubmenuDialogStatus: LoggedInSubmenuDialogStatusReducer,
    metamaskConfiguration: MetamaskConfigurationReducer,
    phantomConfiguration: PhantomConfigurationReducer,
    submenuDialogStatus: SubmenuDialogStatusReducer,
    accountInformation: AccountInformationReducer,
});