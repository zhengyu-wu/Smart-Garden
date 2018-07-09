import axios from 'axios';
import { LOAD_USER } from '../constants';


export const get_user = (email,password) => {
    // return dispatch => {
    //   dispatch(fetch_user_request())
    //   axios.get("https://randomuser.me/api/")
    //     .then(res => {
    //       dispatch(fetch_user(res.data.results[0]));
    //     })
    //     .catch(error => {
    //       dispatch(fetch_user_failure(error.response.data));
    //     })
    // };
    console.log("email:"+email+"password"+password);
    return {
        type: LOAD_USER,
        // payload: axios.get("https://randomuser.me/api/")
        payload: {
            //todo 此处应该设置参数 并修改发送地址 对于genymotion
            promise: axios.get("http://192.168.56.1:8080/users/loginWithEmail",{params:{email:email,password:password}})
        }
    };
};