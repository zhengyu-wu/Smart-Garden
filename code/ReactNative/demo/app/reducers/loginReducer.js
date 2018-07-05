
import * as types from '../constants/loginTypes';


const initialState={
    status:'CLICK_TO_LOGIN',
    isSuccess: false,
    user:null,
};

//不同类别的事件使用switch对应处理过程
export default function loginIn(state=initialState,action) {
    switch (action.type){
        case types.LOGIN_IN_DOING:
            return{
                ...state,
                status:"IN_DOING",
                isSuccess:false,
                user:null,
            };
            break;
        case types.LOGIN_IN_DONE:
            return{
                ...state,
                status:'IN_DONE',
                isSuccess:true,
                user:action.user,
            };
            break;
        case types.LOGIN_IN_ERROR:
            return{
                ...state,
                status:'IN_ERROR',
                isSuccess:true,
                user:null,
            }
            break;
        default:
            return state;
    }

}