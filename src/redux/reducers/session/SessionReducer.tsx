import {
    LOGIN_PLAYER,
    LOGOUT_PLAYER,
} from "../../actions/session/SessionActions"

const initialState = {
    session: {}
}

let SessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_PLAYER:
            return {
                ...state,
                session: action.payload,
            };
        case LOGOUT_PLAYER:
            return initialState;
        default:
            return state;
    }
};

export { SessionReducer };