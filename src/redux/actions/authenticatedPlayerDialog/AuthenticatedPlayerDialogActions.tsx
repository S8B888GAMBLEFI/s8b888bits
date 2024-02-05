
export const SET_AUTHENTICATED_PLAYER_DIALOG_STATUS = 'SET_AUTHENTICATED_PLAYER_DIALOG_STATUS';

export const DELETE_AUTHENTICATED_PLAYER_DIALOG_STATUS = 'DELETE_AUTHENTICATED_PLAYER_DIALOG_STATUS';

const setAuthenticatedPlayerDialogStatusAction = (data) => ({
    type: SET_AUTHENTICATED_PLAYER_DIALOG_STATUS,
    payload: data
});

const deleteAuthenticatedPlayerDialogStatusAction = () => ({
    type: DELETE_AUTHENTICATED_PLAYER_DIALOG_STATUS,
    payload: {}
});

export { 
    setAuthenticatedPlayerDialogStatusAction,
    deleteAuthenticatedPlayerDialogStatusAction
};