export const SET_POSTS = 'SET_POSTS'

export const setPosts = () => {
    return async (dispatch) => {
        const response = await fetch('https://huwngbook-default-rtdb.firebaseio.com/posts.json')

        const resData = await response.json()
    
        dispatch({
            type: SET_POSTS,
            posts: [...resData],
        })
    }
}