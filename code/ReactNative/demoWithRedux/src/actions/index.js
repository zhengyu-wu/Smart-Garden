import axios from 'axios';
import {LOAD_USER, USER_LOG_OUT} from '../constants';


export const get_user = (email,password) => {
    return {
        type: LOAD_USER,
        payload: {
            promise: axios.get("http://192.168.56.1:8080/users/loginWithEmail",{params:{email:email,password:password}})
        }
    };
};

export const log_out =()=>{
    return{
        type: USER_LOG_OUT
    }
};