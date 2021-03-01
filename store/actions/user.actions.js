export const EDIT_USER = 'EDIT_USER'
export const SET_USER = 'SET_USER'
export const SIGN_USER_OUT = 'SIGN_USER_OUT'

export const signUserOut = () => {
    return (dispatch) => {

        dispatch({
            type: SIGN_USER_OUT,
            userData: {
                name: 'Guess',
                userName: '@guess',
                avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
                bio: 'Bio',
                birthday: 'YYYY/MM/DD',
                address: 'Viet Nam',
                phoneNumber: '0123456789',
                email: 'guess@gmail.com',
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

export const editUser = (id, userData) => {
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
            type: EDIT_USER,
            userData: {
                ...userData
            }
        })
    }
}