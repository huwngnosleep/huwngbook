import { CREATE_USER, SET_USER, SIGN_USER_OUT } from "../actions/user.actions"

const initialState = {
    currentUser: {
        name: 'Guess',
        avatar: 'https://www.cstitches.com/wp-content/uploads/2019/05/no_avatar.png',
        bio: 'Bio',
        birthday: '',
        detailInfo: ['Detail', 'Detail', 'Detail'],
        posts: [],
        friends: [1,2,3,4,5,6,7,8,9],
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_USER_OUT:
            return {
                ...state,
                currentUser: {
                    ...action.userData
                },
            }
        case CREATE_USER:
            return {
                ...state,
                currentUser: {
                    ...action.userData
                },
            }
        case SET_USER: 
            return {
                ...state,
                currentUser: {
                    ...action.userData                                                           
                },
            }
    
        default:
            return state
    }
}