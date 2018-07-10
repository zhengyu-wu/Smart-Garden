import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import  jweDecode from 'jwt-decode'
import {SET_CURRENT_USER} from "../constants/ActionTypes";

export const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        user
    }
};


export const login = (data) => {
    return dispatch => {
        return axios.post('../components/LoginPage', data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jweDecode(token)))
        });
    }
};