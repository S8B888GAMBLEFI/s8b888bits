

export const SET_COOKIE_CONSENT = 'SET_COOKIE_CONSENT';
export const GET_COOKIE_CONSENT = 'GET_COOKIE_CONSENT';

const setCookieConsentAction = (data) => ({
    type: SET_COOKIE_CONSENT,
    payload: data
});

const getCookieConsentAction = (data) => ({
    type: GET_COOKIE_CONSENT,
    payload: data
});

export { 
    setCookieConsentAction, getCookieConsentAction,
};