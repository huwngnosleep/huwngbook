
import { createStore, applyMiddleware } from 'redux'

import ReduxThunk from 'redux-thunk'

import rootReducer from './root-reducer'

const middleWares = [ReduxThunk]

const store = createStore(rootReducer, applyMiddleware(...middleWares))

export default store
