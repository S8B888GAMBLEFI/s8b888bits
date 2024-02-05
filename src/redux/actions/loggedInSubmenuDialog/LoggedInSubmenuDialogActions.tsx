
export const SET_LOGGED_IN_DIALOG_STATUS = 'SET_LOGGED_IN_DIALOG_STATUS';

export const DELETE_LOGGED_IN_DIALOG_STATUS = 'DELETE_LOGGED_IN_DIALOG_STATUS';

const setLoggedInDialogStatusAction = (data) => ({
    type: SET_LOGGED_IN_DIALOG_STATUS,
    payload: data
});

const deleteLoggedInDialogStatusAction = () => ({
    type: DELETE_LOGGED_IN_DIALOG_STATUS,
    payload: {}
});

export {
    setLoggedInDialogStatusAction,
    deleteLoggedInDialogStatusAction
};