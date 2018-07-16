import { combineReducers } from 'redux'
import  validateAuth from './validateAuth'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    form:formReducer,
    validateAuth:validateAuth
})


