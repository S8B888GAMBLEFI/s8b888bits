
export const SET_METAMASK_CONFIGURATION = 'SET_METAMASK_CONFIGURATION';

export const DELETE_METAMASK_CONFIGURATION = 'DELETE_METAMASK_CONFIGURATION';

const setMetamaskConfigurationAction = (data) => ({
    type: SET_METAMASK_CONFIGURATION,
    payload: data
});

const deleteMetamaskConfigurationAction = () => ({
    type: DELETE_METAMASK_CONFIGURATION,
    payload: {}
});

export {
    setMetamaskConfigurationAction,
    deleteMetamaskConfigurationAction
};