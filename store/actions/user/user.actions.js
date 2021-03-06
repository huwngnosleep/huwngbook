import * as firebase from 'firebase';
import DatabaseUrl from '../../../constants/DatabaseUrl';
import PostModel from '../../../models/post.model';

export const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
export const EDIT_USER = 'EDIT_USER'
export const SET_USER = 'SET_USER'
export const SIGN_USER_OUT = 'SIGN_USER_OUT'



export const editProfileImage = (imageUri, localId) => {
    return async (dispatch) => {
        const response = await fetch(imageUri)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(`${localId}/avatar`).put(blob)
        const newImageUri = await ref.snapshot.ref.getDownloadURL()

        fetch(`${DatabaseUrl}/users/${localId}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: newImageUri
            })
        })

        dispatch({
            type: EDIT_PROFILE_IMAGE,
            imageUri,
        })
    }
}
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
        const response = await fetch(`${DatabaseUrl}/users/${id}.json`)
        
        const resData = await response.json()

        console.log(resData)

        const loadedPosts = []

        // map posts form from hash table to array for rendering
        for(const key in resData.posts) {
            loadedPosts.unshift(new PostModel({
                id: resData.posts[key].id,
                owner: resData.posts[key].owner,
                ownerId: resData.posts[key].ownerId,
                ownerAvatar: resData.posts[key].ownerAvatar,
                date: resData.posts[key].date,
                imageUri: resData.posts[key].imageUri,
                content: resData.posts[key].content
            }))
        }

        dispatch({
            type: SET_USER,
            userData: {
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