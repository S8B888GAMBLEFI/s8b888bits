
export const LOGIN_PLAYER = 'LOGIN_PLAYER';
export const LOGOUT_PLAYER = 'LOGOUT_PLAYER';

const loginPlayerAction = (loginData) => ({
    type: LOGIN_PLAYER,
    payload: loginData
});

const logoutPlayerAction = () => ({
    type: LOGOUT_PLAYER,
    payload: {}
});


export {
    loginPlayerAction,
    logoutPlayerAction,
};