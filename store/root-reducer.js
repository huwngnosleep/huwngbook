
import { combineReducers } from 'redux'

import authReducers from './reducers/auth.reducers'
import postReducer from './reducers/posts.reducers'
import userReducers from './reducers/user.reducers'

export default combineReducers({
    post: postReducer,
    auth: authReducers,
    user: userReducers,
})