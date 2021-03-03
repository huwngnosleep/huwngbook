
import { combineReducers } from 'redux'

import authReducers from './reducers/auth.reducers'
import userReducers from './reducers/user.reducers'

export default combineReducers({
    auth: authReducers,
    user: userReducers,
})