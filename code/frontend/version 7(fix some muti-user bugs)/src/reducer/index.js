import { combineReducers } from 'redux'
import  validateAuth from './validateAuth'
import { reducer as formReducer } from 'redux-form'
import user from './user'

export default combineReducers({
    form:formReducer,
    validateAuth:validateAuth,
    user:user
})


