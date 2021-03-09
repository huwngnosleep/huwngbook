import { 
    EDIT_USER, 
    SET_USER, 
    SIGN_USER_OUT,
    EDIT_PROFILE_IMAGE,
    FRIEND_REQUEST_RESPONSE,
} from "../actions/user/user.actions"
import {
    SET_NEWS_FEED,
    CREATE_POST, 
    DELETE_POST,
    EDIT_POST,
} from "../actions/user/post.actions"
import DatabaseUrl from "../../constants/DatabaseUrl"
import DefaultGuessUserData from "../../constants/DefaultGuessUserData"


const initialState = {
    currentUser: {
        ...DefaultGuessUserData
    },
    newsFeed: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FRIEND_REQUEST_RESPONSE:
            if(action.responseStatus === 'confirmed') {
                // check whether current user have any friend
                const newFriendList = state.currentUser.friends.concat(action.ownerId)
                const newPendingFriendRequests = state.currentUser.pendingFriendRequests.filter(
                    (requestOwnerId) => requestOwnerId !== action.ownerId
                )
                const updateOnDatabase = async () => {
                    fetch(`${DatabaseUrl}/users/${action.localId}.json`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            friends: newFriendList,
                            pendingFriendRequests: newPendingFriendRequests,
                        })
                    })

                    let ownerRequestFriendList = await (await fetch(`${DatabaseUrl}/users/${action.ownerId}/friends.json`)).json()
                    if(!ownerRequestFriendList) {
                        ownerRequestFriendList = []
                    }
                    fetch(`${DatabaseUrl}/users/${action.ownerId}.json`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            friends: ownerRequestFriendList.concat(action.localId),
                        })
                    })
                }
                updateOnDatabase()
                
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        pendingFriendRequests: newPendingFriendRequests,
                        friends: newFriendList,
                    }
                }
            } else {
                const newPendingFriendRequests = state.currentUser.pendingFriendRequests.filter(
                    (requestOwnerId) => requestOwnerId !== action.ownerId
                )
                fetch(`${DatabaseUrl}/users/${action.localId}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pendingFriendRequests: newPendingFriendRequests,
                    })
                })

                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        pendingFriendRequests: newPendingFriendRequests,
                    }
                }
            }
        case EDIT_POST:
            const editedPost = state.currentUser.posts.find((post) => post.id === action.postId)
            const newsFeedIndex = state.newsFeed.indexOf(editedPost)
            const currentUserPostsIndex = state.currentUser.posts.indexOf(editedPost)
            editedPost.content = action.newContent
            state.newsFeed[newsFeedIndex] = editedPost
            state.currentUser.posts[currentUserPostsIndex] = editedPost
            return {
                newsFeed: state.newsFeed,
                currentUser: {
                    ...state.currentUser,
                    posts: state.currentUser.posts,
                }
            }
        case DELETE_POST:
            return {
                newsFeed: state.newsFeed.filter((post) => post.id !== action.postId),
                currentUser: {
                    ...state.currentUser,
                    posts: state.currentUser.posts.filter((post) => post.id !== action.postId)
                }
            }
        case EDIT_PROFILE_IMAGE:
            if(action.imageType === 'avatar') {
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        avatar: action.imageUri,
                    }
                }
            } else {
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        coverImage: action.imageUri,
                    }
                }
            }
        case SET_NEWS_FEED: 
            return {
                ...state,
                newsFeed: action.posts,
            }
        case CREATE_POST:
            const currentNewsFeed = state.newsFeed
            const currentUserPosts = state.currentUser.posts
            currentNewsFeed.unshift(action.postData)
            currentUserPosts.unshift(action.postData)
            return {
                ...state,
                newsFeed: currentNewsFeed,
                currentUser: {
                    ...state.currentUser,
                    posts: currentUserPosts
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
                currentUser: {...action.userData}
            }
    
        default:
            return state
    }
}