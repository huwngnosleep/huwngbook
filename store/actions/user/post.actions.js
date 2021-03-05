import DatabaseUrl from "../../../constants/DatabaseUrl"
import PostModel from "../../../models/post.model"

export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const setPosts = () => {
    return async (dispatch) => {
        const response = await fetch(`${DatabaseUrl}/posts.json`)

        const resData = await response.json()

        const loadedPosts = []

        for(const key in resData) {
            loadedPosts.unshift(new PostModel(
                resData[key].id,
                resData[key].owner,
                resData[key].date,
                resData[key].imageUri,
                resData[key].content
            ))
        }
    
        dispatch({
            type: SET_POSTS,
            posts: [...loadedPosts],
        })
    }
}

export const deletePost = (localId, postId) => {
    return (dispatch) => {
        fetch(`${DatabaseUrl}/users/${localId}/posts/${postId}.json`, {
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
        const response = await fetch(`${DatabaseUrl}/users/${localId}/posts.json`, {
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

        // after creating the new post, i'll give it an id for editing later
        fetch(`${DatabaseUrl}/users/${localId}/posts/${resData.name}.json`, {
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