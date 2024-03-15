import {
    SET_ACCOUNT_INFORMATION,
    DELETE_ACCOUNT_INFORMATION
} from "../../actions/accountInformation/AccountInformationActions";

const initialState = {
    accountInformation: null
}

let AccountInformationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_INFORMATION:
            return {
                ...state,
                accountInformation: action.payload,
            };
        case DELETE_ACCOUNT_INFORMATION:
            //console.log("DELETE ACCOUNT INFORMATION");
            return {
                initialState
            };
        default:
            return state;
    }
};

export { AccountInformationReducer };