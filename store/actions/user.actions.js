export const CREATE_USER = 'CREATE_USER'
export const SET_USER = 'SET_USER'
export const SIGN_USER_OUT = 'SIGN_USER_OUT'

export const signUserOut = () => {
    return (dispatch) => {

        dispatch({
            type: SIGN_USER_OUT,
            userData: {
                name: 'Guess',
                avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
                bio: 'Bio',
                birthday: '',
                detailInfo: ['Detail', 'Detail', 'Detail'],
                posts: [],
                friends: [1,2,3,4,5,6,7,8,9],
            },
        })
    }
}

export const setUser = (id) => {
    return async (dispatch) => {
        const response = await fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${id}.json`)
        
        const resData = await response.json()

        dispatch({
            type: SET_USER,
            userData: {
                ...resData
            }
        })
    }
}

export const createUser = (id, userData) => {
    return (dispatch) => {
        fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...userData
            })
        })

        dispatch({
            type: CREATE_USER,
            userData: {
                ...userData
            }
        })
    }
}