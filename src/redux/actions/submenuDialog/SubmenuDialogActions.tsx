
export const SET_SUBMENU_DIALOG_STATUS = 'SET_SUBMENU_DIALOG_STATUS';

export const DELETE_SUBMENU_DIALOG_STATUS = 'DELETE_SUBMENU_DIALOG_STATUS';

const setSubmenuDialogStatusAction = (data) => ({
    type: SET_SUBMENU_DIALOG_STATUS,
    payload: data
});

const deleteSubmenuDialogStatusAction = () => ({
    type: DELETE_SUBMENU_DIALOG_STATUS,
    payload: {}
});

export { 
    setSubmenuDialogStatusAction,
    deleteSubmenuDialogStatusAction
};