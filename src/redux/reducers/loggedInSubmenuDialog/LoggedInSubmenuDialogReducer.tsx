import {
    SET_LOGGED_IN_DIALOG_STATUS,
    DELETE_LOGGED_IN_DIALOG_STATUS
} from "../../actions/loggedInSubmenuDialog/LoggedInSubmenuDialogActions";

const initialState = {
    loggedInSubmenuDialogStatus: {}
}

let LoggedInSubmenuDialogStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN_DIALOG_STATUS:
            return {
                ...state,
                loggedInSubmenuDialogStatus: action.payload,
            };
        case DELETE_LOGGED_IN_DIALOG_STATUS:
            return {
                initialState
            };
        default:
            return state;
    }
};

export { LoggedInSubmenuDialogStatusReducer };