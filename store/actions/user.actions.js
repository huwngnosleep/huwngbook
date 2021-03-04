import PostModel from "../../models/post.model"
import * as firebase from 'firebase';

export const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
export const EDIT_USER = 'EDIT_USER'
export const SET_USER = 'SET_USER'
export const SIGN_USER_OUT = 'SIGN_USER_OUT'
export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const setPosts = () => {
    return async (dispatch) => {
        const response = await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json')

        const resData = await response.json()

        const loadedPosts = []

        // for(const key in resData) {
        //     loadedPosts.unshift(new PostModel(
        //         resData[key].id,
        //         resData[key].owner,
        //         resData[key].date,
        //         resData[key].imageUri,
        //         resData[key].content
        //     ))
        // }
    
        dispatch({
            type: SET_POSTS,
            posts: [...loadedPosts],
        })
    }
}

export const deletePost = (localId, postId) => {
    return (dispatch) => {
        fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${localId}/posts/${postId}.json`, {
                method: 'DELETE'
        })
        dispatch({
            type: DELETE_POST,
            postId,
        })
    }
}

export const createPost = (localId, postData) => {

    return async (dispatch) => {
        const response = await fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${localId}/posts.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: '',
                ...postData,
            })
        })

        const resData = await response.json()

        fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${localId}/posts/${resData.name}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: resData.name,
            })
        })

        dispatch({
            type: CREATE_POST,
            postData: {
                id: resData.name,
                ...postData,
            },
        })
    }
}
export const editProfileImage = (imageUri, localId) => {
    return async (dispatch) => {
        const response = await fetch(imageUri)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(`${localId}/avatar`)
        ref.put(blob)

        dispatch({
            type: EDIT_PROFILE_IMAGE,
            imageData: imageUri,
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
        const response = await fetch(`https://huwngbook-default-rtdb.firebaseio.com/users/${id}.json`)
        
        const resData = await response.json()

        const loadedPosts = []

        for(const key in resData.posts) {
            loadedPosts.unshift(new PostModel(
                resData.posts[key].id,
                resData.posts[key].owner,
                resData.posts[key].date,
                resData.posts[key].imageUri,
                resData.posts[key].content
            ))
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