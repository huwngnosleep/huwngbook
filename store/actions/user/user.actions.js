import * as firebase from 'firebase'
import DatabaseUrl from '../../../constants/DatabaseUrl'
import DefaultGuessUserData from '../../../constants/DefaultGuessUserData'
import PostModel from '../../../models/post.model'

export const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
export const EDIT_USER = 'EDIT_USER'
export const SET_USER = 'SET_USER'
export const SIGN_USER_OUT = 'SIGN_USER_OUT'
export const FRIEND_REQUEST_RESPONSE = 'FRIEND_REQUEST_RESPONSE'

export const friendRequestResponse = (responseStatus, ownerId, localId) => {
    return (dispatch) => {
        dispatch({
            type: FRIEND_REQUEST_RESPONSE,
            responseStatus,
            ownerId,
            localId,
        })
    }
}
export const editProfileImage = (imageType, imageUri, localId) => {
    return async (dispatch) => {
        let newImageUri
        try {
            const response = await fetch(imageUri)
            const blob = await response.blob()
            await firebase.storage().ref().child(`${localId}/${imageType}`).put(blob)
            var ref = firebase.storage().ref().child(`${localId}/${imageType}`).put(blob)
            newImageUri = await ref.snapshot.ref.getDownloadURL()
            
        } catch (error) {
            console.log(error)
            
        }
        if(imageType === 'avatar') {
            fetch(`${DatabaseUrl}/users/${localId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: newImageUri
                })
            })
        } else {
            fetch(`${DatabaseUrl}/users/${localId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coverImage: newImageUri
                })
            })
        }

        dispatch({
            type: EDIT_PROFILE_IMAGE,
            imageType,
            imageUri,
        })

    }
}
export const signUserOut = () => {
    return (dispatch) => {

        dispatch({
            type: SIGN_USER_OUT,
            userData: {
                ...DefaultGuessUserData
            },
        })
    }
}

export const setUser = (id) => {
    return async (dispatch) => {
        const response = await fetch(`${DatabaseUrl}/users/${id}.json`)
        
        const resData = await response.json()

        console.log(resData)

        const loadedPosts = []

        // map posts form from hash table to array for rendering
        for(const key in resData.posts) {
            loadedPosts.unshift(new PostModel({
                id: resData.posts[key].id,
                ownerId: resData.posts[key].ownerId,
                date: resData.posts[key].date,
                imageUri: resData.posts[key].imageUri,
                content: resData.posts[key].content
            }))
        }

        dispatch({
            type: SET_USER,
            userData: {
                // set default blank friendsList if it's new user, for no error occur with store
                ...DefaultGuessUserData,
                ...resData,
                posts: loadedPosts,
            }
        })
    }
}

export const editUser = (id, userData) => {
    return (dispatch) => {
        fetch(`${DatabaseUrl}/users/${id}.json`, {
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