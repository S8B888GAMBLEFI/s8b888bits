import {
    SET_METAMASK_CONFIGURATION,
    DELETE_METAMASK_CONFIGURATION
} from "../../actions/metamaskConfiguration/MetamaskConfigurationActions";

const initialState = {
    metamaskConfiguration: null
}

let MetamaskConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_METAMASK_CONFIGURATION:
            return {
                ...state,
                metamaskConfiguration: action.payload,
            };
        case DELETE_METAMASK_CONFIGURATION:
            return {
                initialState
            };
        default:
            return state;
    }
};

export { MetamaskConfigurationReducer };