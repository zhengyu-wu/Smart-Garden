import axios from 'axios';
import {LOAD_USER, REGISTER, REGISTER_REJECTED, USER_LOG_OUT,CLEAR_REGISTER} from '../constants';


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

export const register = (username,phone,email,password,navigation) => {
    if(username===""||phone===""||email===""||password==="")
        return{
            type: REGISTER_REJECTED,
        };
    else{
        return {
            type: REGISTER,
            payload: {
                promise: axios.post("http://192.168.56.1:8080/users/addUser",{
                    'username': username,
                    'phone': phone,
                    'email': email,
                    'password': password
                },{
                    "headers": {
                        'Content-Type': 'application/json',
                    }
                })
            }
        };
    }

};

export const clear_register =()=>{
    return{
        type:CLEAR_REGISTER,
    }
};