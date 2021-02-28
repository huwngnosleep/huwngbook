import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../actions/auth.actions";

const initialState = {
    // idToken: used for editing user's features
    idToken: null,

    // localId: from firebase authentication, used for getting user data when signing in
    localId: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_OUT: 
            return {
                idToken: action.idToken,
                localId: action.localId,
            }
        case SIGN_IN:
            return {
                idToken: action.idToken,
                localId: action.localId,
            }
        case SIGN_UP:
            return {
                idToken: action.idToken,
                localId: action.localId,
            }
    
        default:
            return state
    }
}