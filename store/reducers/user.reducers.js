import { 
    EDIT_USER, 
    SET_USER, 
    SIGN_USER_OUT,
    EDIT_PROFILE_IMAGE,
} from "../actions/user/user.actions"
import {
    SET_POSTS,
    CREATE_POST, 
    DELETE_POST,
} from "../actions/user/post.actions"


const initialState = {
    currentUser: {
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
    posts: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POST:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    posts: state.currentUser.posts.filter((post) => post.id !== action.postId)
                }
            }
        case EDIT_PROFILE_IMAGE:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    avatar: action.imageData,
                }
            }
        case SET_POSTS: 
            return {
                ...state,
                posts: action.posts,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: state.posts.unshift(action.postData),
                currentUser: {
                    ...state.currentUser,
                    posts: state.currentUser.posts.unshift(action.postData)
                }
            }

        case SIGN_USER_OUT:
            return {
                ...state,
                currentUser: {
                    ...action.userData
                },
            }
        case EDIT_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.userData
                },
            }
        case SET_USER: 
            return {
                ...state,
                currentUser: action.userData
            }
    
        default:
            return state
    }
}