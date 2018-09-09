import axios from 'axios';
import {
    LOAD_USER,
    REGISTER,
    REGISTER_REJECTED,
    USER_LOG_OUT,
    CLEAR_REGISTER,
    MODIFY_USER, HOST_NAME,
} from '../constants';

import qs from 'qs';

export const get_user = (email,password) => {
    return {
        type: LOAD_USER,
        payload: {
            promise: axios.get(HOST_NAME+"/users/loginWithEmail",{params:{email:email,password:password}})
        }
    };
};

export const log_out =()=>{
    return{
        type: USER_LOG_OUT
    }
};

export const register = (username,phone,email,password) => {
    if(username===""||phone===""||email===""||password==="")
        return{
            type: REGISTER_REJECTED,
        };
    else{
        const params={
            username: username,
            password: password,
            email: email,
            phone: phone
        };
        return {
            type: REGISTER,
            payload: {
                promise: axios.post(HOST_NAME+"/users/addUser",qs.stringify(params))
            }
        };
    }

};

export const modifyUser = (userId,userType,username,phone,email,password) =>{
    const params={
        userId:userId,
        userType:userType,
        phone:phone,
        email:email,
        password:password,
        username:username
    };
    return{
        type:MODIFY_USER,
        payload:{
            promise: axios.post(HOST_NAME+"/users/updateUser",qs.stringify(params))
        },
        meta:{
            userId:userId,
            userType:userType,
            username:username,
            phone:phone,
            email:email,
            password:password
        }
    }

};
