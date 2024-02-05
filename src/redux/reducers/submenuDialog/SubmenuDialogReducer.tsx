import {
    SET_SUBMENU_DIALOG_STATUS,
    DELETE_SUBMENU_DIALOG_STATUS
} from "../../actions/submenuDialog/SubmenuDialogActions"

const initialState = {
    submenuDialogStatus: {}
}

let SubmenuDialogStatusReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SUBMENU_DIALOG_STATUS: 
            return {
                ...state, 
                submenuDialogStatus: action.payload,
            };
        case DELETE_SUBMENU_DIALOG_STATUS: 
            return {
                initialState
            };     
        default: 
            return state;    
    }
};

export { SubmenuDialogStatusReducer };