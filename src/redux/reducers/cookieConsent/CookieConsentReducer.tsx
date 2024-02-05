import {
    SET_COOKIE_CONSENT,
    GET_COOKIE_CONSENT,    
} from "../../actions/cookieConsent/CookieConsentActions"

const initialState = {
    cookieConsent: {}
}

let CookieConsentReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_COOKIE_CONSENT: 
            return {
                ...state, 
                cookieConsent: action.payload,
            };
        case GET_COOKIE_CONSENT:
            return {
                ...state,
                cookieConsent: action.payload
            };
        default: 
            return state;    
    }
};

export { CookieConsentReducer };