
import {combineReducers} from 'redux';
import loginIn from './loginReducer';

//这个是将所有的redux处理逻辑包装在一起
const rootReducer=combineReducers(
    {
        loginIn:loginIn,

    }
);

export default rootReducer;