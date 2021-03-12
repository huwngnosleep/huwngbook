import { 
    EDIT_USER, 
    SET_USER, 
    SIGN_USER_OUT,
    EDIT_PROFILE_IMAGE,
    FRIEND_REQUEST_RESPONSE,
} from "../actions/user/user.actions"
import DatabaseUrl from "../../constants/DatabaseUrl"
import DefaultGuessUserData from "../../constants/DefaultGuessUserData"


const initialState = {
    currentUser: {
        ...DefaultGuessUserData
    },
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
                    currentUser: {
                        ...state.currentUser,
                        pendingFriendRequests: newPendingFriendRequests,
                    }
                }
            }
        case EDIT_PROFILE_IMAGE:
            if(action.imageType === 'avatar') {
                return {
                    currentUser: {
                        ...state.currentUser,
                        avatar: action.imageUri,
                    }
                }
            } else {
                return {
                    currentUser: {
                        ...state.currentUser,
                        coverImage: action.imageUri,
                    }
                }
            }
        case SIGN_USER_OUT:
            return {
                currentUser: action.userData,
            }
        case EDIT_USER:
            return {
                currentUser: {
                    ...state.currentUser,
                    ...action.userData
                },
            }
        case SET_USER: 
            return {
                currentUser: action.userData,
            }
    
        default:
            return state
    }
}