import ENV from '../../env'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'

export const signUp = (email, password) => {
    return async (dispatch) => {
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

        console.log(response)
        console.log(resData)

        if(!response.ok) {
            throw new Error(resData.error.message)
        }

        await fetch('https://huwngbook-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: resData.localId,
                idToken: resData.idToken,
                email,
                password,
            })
        })

        dispatch({
            type: SIGN_UP,
            idToken: resData.idToken,
            userId: resData.localId,
        })
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

        console.log(resData)

        if(!response.ok) {
            throw new Error(resData.error.message)
        }

        const usersResponse = await fetch('https://huwngbook-default-rtdb.firebaseio.com/users.json')

        const usersData = await usersResponse.json()

        for(const key in usersData) {
            if(usersData[key].userId === resData.localId) {
                var user = usersData[key]
            }
        }

        dispatch({
            type: SIGN_IN, 
            idToken: resData.idToken,
            userId: resData.localId,
            user,
        })
    }
}