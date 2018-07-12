import {
    CLEAR_REGISTER,
    LOAD_USER_FULFILLED,
    LOAD_USER_PENDING,
    LOAD_USER_REJECTED,
    REGISTER_FULFILLED, REGISTER_PENDING, REGISTER_REJECTED,
    USER_LOG_OUT
} from '../constants';
import {Toast} from 'antd-mobile-rn';
import {initialState} from '../state';


const user = (state = initialState, action={}) => {
    switch (action.type) {
        case LOAD_USER_FULFILLED:
            if(typeof (action.payload.data.userId)==="undefined")
            {
                Toast.fail("login fails",1);
                return{
                    isFetching: false,
                    error: "email and password don't match",
                    hasLogin:false,
                    user: {}
                };
            }

            Toast.success("login successfully",1);
            return {
                isFetching:false,
                hasLogin:true,
                error:null,
                user:action.payload.data
            };
        case LOAD_USER_PENDING:
            Toast.info("processing",1);
            return {
                isFetching: true,
                error: null,
                hasLogin:false,
                user: {}
            };
        case LOAD_USER_REJECTED:
            Toast.fail("Login fails",1);
            return {
                isFetching: false,
                error: action.payload.response.data,
                hasLogin:false,
                user: {}
            };
        case USER_LOG_OUT:
            Toast.info("logout successfully",1);
            return{
                isFetching: false,
                error: null,
                hasLogin:false,
                user: {}
            };
        case REGISTER_FULFILLED:
            Toast.success("register successfully",1);
            return {
                ...state,
                hasRegister:true
            };
        case REGISTER_PENDING:
            Toast.info("processing",1);
            return {
                ...state,
                hasRegister:false
            };
        case REGISTER_REJECTED:
            Toast.info("register fails",1);
            return {
                ...state,
                hasRegister:false
            };
        case CLEAR_REGISTER:
            return {
                ...state,
                hasRegister:false
            }
        default:
            return state;
    }
};
export default user;