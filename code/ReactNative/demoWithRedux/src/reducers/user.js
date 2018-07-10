import { LOAD_USER_FULFILLED, LOAD_USER_PENDING, LOAD_USER_REJECTED } from '../constants';
import {Toast} from 'antd-mobile-rn';

const initialState={
    isFetching: false,
    error:null,
    user:{}
};

const user = (state = initialState, action={}) => {
    switch (action.type) {
        case LOAD_USER_FULFILLED:
            Toast.success("login successfully",1);
            return {
                isFetching:false,
                error:null,
                user:action.payload.data
            };
        case LOAD_USER_PENDING:
            Toast.info("processing",1);
            return {
                isFetching: true,
                error: null,
                user: {}
            };
        case LOAD_USER_REJECTED:
            Toast.fail("Login fails",1);
            return {
                isFetching: false,
                error: action.payload.response.data,
                user: {}
            };
        default:
            return state;
    }
};
export default user;