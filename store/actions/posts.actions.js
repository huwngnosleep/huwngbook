import PostModel from "../../models/post.model"

export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'

export const setPosts = () => {
    return async (dispatch) => {
        const response = await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json')

        const resData = await response.json()

        const loadedPosts = []

        for(const key in resData) {
            loadedPosts.unshift(new PostModel(
                Math.random(),
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

export const createPost = (owner, date, imageUri, content) => {
    let postId = Math.random()

    return async (dispatch) => {
        await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: postId,
                owner,
                date,
                imageUri,
                content,
            })

        })


        dispatch({
            type: CREATE_POST,
            post: {
                id: postId,
                owner,
                date,
                imageUri,
                content,
            },
        })
    }
}