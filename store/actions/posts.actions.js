import PostModel from "../../models/post.model"
import { useSelector } from 'react-redux'

export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'

export const setPosts = () => {
    return async (dispatch) => {
        const response = await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json')

        const resData = await response.json()

        const loadedPosts = []

        // for(const key in resData) {
        //     loadedPosts.unshift(new PostModel(
        //         Math.random(),
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

export const createPost = (postData) => {

    return async (dispatch) => {
        const response = await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json', {
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

        fetch(`https://huwngbook-default-rtdb.firebaseio.com/posts/${resData.name}.json`, {
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