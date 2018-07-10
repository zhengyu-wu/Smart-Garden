import axios from 'axios';
import { LOAD_USER } from '../constants';


export const get_user = (email,password) => {
    console.log("email:"+email+"password"+password);
    return {
        type: LOAD_USER,
        payload: {
            promise: axios.get("http://192.168.56.1:8080/users/loginWithEmail",{params:{email:email,password:password}})
        }
    };
};