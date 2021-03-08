import DatabaseUrl from "../../../constants/DatabaseUrl"
import PostModel from "../../../models/post.model"

export const SET_NEWS_FEED = 'SET_NEWS_FEED'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

export const editPost = (localId, postId, content) => {
    return (dispatch) => {
        fetch(`${DatabaseUrl}/users/${localId}/posts/${postId}.json`,  {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
            })
        })

        dispatch({
            type: EDIT_POST,
            postId,
            newContent: content,
        })
    }
}
export const setNewsFeed = (localId) => {
    return async (dispatch) => {
        const currentUserPostResponse = await fetch(`${DatabaseUrl}/users/${localId}/posts.json`)
        const currentUserPostResData = await currentUserPostResponse.json()

        const loadedPosts = []
        
        for(const key in currentUserPostResData) {
            loadedPosts.unshift(new PostModel({
                id: currentUserPostResData[key].id,
                ownerId: currentUserPostResData[key].ownerId,
                date: currentUserPostResData[key].date,
                imageUri: currentUserPostResData[key].imageUri,
                content: currentUserPostResData[key].content
            }))
        }
        
        const friendsListResponse = await fetch(`${DatabaseUrl}/users/${localId}/friends.json`)
        const friendsListResData = await friendsListResponse.json()

        const loadedFriendsPosts = []

        for(const key in friendsListResData) {
            const eachFriendPost = await fetch(`${DatabaseUrl}/users/${friendsListResData[key]}/posts.json`)
            const eachFriendPostResData = await eachFriendPost.json()

            for(const post in eachFriendPostResData) {
                loadedFriendsPosts.unshift(new PostModel({
                    id: eachFriendPostResData[post].id,
                    ownerId: eachFriendPostResData[post].ownerId,
                    date: eachFriendPostResData[post].date,
                    imageUri: eachFriendPostResData[post].imageUri,
                    content: eachFriendPostResData[post].content
                }))
            }
        }

        const totalLoadedPosts = loadedFriendsPosts.concat(loadedPosts)
        totalLoadedPosts.sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))

        dispatch({
            type: SET_NEWS_FEED,
            posts: totalLoadedPosts,
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