
import { combineReducers } from 'redux'

import postReducer from './reducers/posts.reducers'

export default combineReducers({
    post: postReducer,
})