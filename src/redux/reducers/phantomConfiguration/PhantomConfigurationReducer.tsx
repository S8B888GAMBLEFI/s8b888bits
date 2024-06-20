import {
    SET_PHANTOM_CONFIGURATION,
    DELETE_PHANTOM_CONFIGURATION
} from "../../actions/phantomConfiguration/PhantomConfigurationActions";

const initialState = {
    phantomConfiguration: null
}

let PhantomConfigurationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHANTOM_CONFIGURATION:
            return {
                ...state,
                phantomConfiguration: action.payload,
            };
        case DELETE_PHANTOM_CONFIGURATION:
            return {
                initialState
            };
        default:
            return state;
    }
};

export { PhantomConfigurationReducer };