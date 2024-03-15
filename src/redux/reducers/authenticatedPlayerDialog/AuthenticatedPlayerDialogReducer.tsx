import {
    SET_AUTHENTICATED_PLAYER_DIALOG_STATUS,
    DELETE_AUTHENTICATED_PLAYER_DIALOG_STATUS
} from "../../actions/authenticatedPlayerDialog/AuthenticatedPlayerDialogActions";

const initialState = {
    authenticatedPlayerDialogStatus: {}
}

let AuthenticatedPlayerDialogStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED_PLAYER_DIALOG_STATUS:
            return {
                ...state,
                authenticatedPlayerDialogStatus: action.payload,
            };
        case DELETE_AUTHENTICATED_PLAYER_DIALOG_STATUS:
            return {
                initialState
            };
        default:
            return state;
    }
};

export { AuthenticatedPlayerDialogStatusReducer };