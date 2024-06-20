
export const SET_PHANTOM_CONFIGURATION = 'SET_PHANTOM_CONFIGURATION';

export const DELETE_PHANTOM_CONFIGURATION = 'DELETE_PHANTOM_CONFIGURATION';

const setPhantomConfigurationAction = (data) => ({
    type: SET_PHANTOM_CONFIGURATION,
    payload: data
});

const deletePhantomConfigurationAction = () => ({
    type: DELETE_PHANTOM_CONFIGURATION,
    payload: {}
});

export {
    setPhantomConfigurationAction,
    deletePhantomConfigurationAction
};