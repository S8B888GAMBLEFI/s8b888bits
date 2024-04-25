
export const SET_ACCOUNT_INFORMATION = 'SET_ACCOUNT_INFORMATION';

export const DELETE_ACCOUNT_INFORMATION = 'DELETE_ACCOUNT_INFORMATION';

const setAccountInformationAction = (data) => ({
    type: SET_ACCOUNT_INFORMATION,
    payload: data
});

const deleteAccountInformationAction = () => ({
    type: DELETE_ACCOUNT_INFORMATION,
    payload: {}
});

export {
    setAccountInformationAction,
    deleteAccountInformationAction
};