import DatabaseUrl from '../../../constants/DatabaseUrl'
import ENV from '../../../env'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_OUT = 'SIGN_OUT'

export const signOut = () => {
    return (dispatch) => {

        dispatch({
            type: SIGN_OUT,
            idToken: null,
            localId: null,
        })
    }
}

export const signUp = (email, password) => {
    return async (dispatch) => {
        // Sign Up response from firebase authentication
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.googleApiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        
        
        const resData = await response.json()
        
        if(!response.ok) {
            throw new Error(resData.error.message)
        }
        
        // after signing up, i will create new user in database
        fetch(`${DatabaseUrl}/users/${resData.localId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: resData.idToken,
                email,
                password,
                name: 'New User',
                avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
                bio: 'Bio',
            })
        })

        dispatch({
            type: SIGN_UP,
            idToken: resData.idToken,
            localId: resData.localId,
        })

        // return localId for dispatching set user data later
        return resData.localId
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.googleApiKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        const resData = await response.json()

        if(!response.ok) {
            throw new Error(resData.error.message)
        }

        dispatch({
            type: SIGN_IN, 
            idToken: resData.idToken,
            localId: resData.localId,
        })

        // return id for setting user data later
        return resData.localId
    }
}