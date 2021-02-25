import { CREATE_POST, SET_POSTS } from "../actions/posts.actions"

const initialState = {
    posts: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_POSTS: 
            return {
                ...state,
                posts: action.posts,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts.posts.unshift(action.post)]
            }

        default: 
            return state
    }
}
