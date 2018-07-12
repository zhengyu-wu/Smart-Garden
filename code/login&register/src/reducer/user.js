import SAVE_USER from '../constants/ActionTypes';

const intialState = {
    hasLogin : false,
    error : null,
    userId : 0,
    phone : "",
    email : ''
};

// const cacheHits = localStorage.getItem('the state');
// if (cacheHits)
// {
//     state = cacheHits;
// }

const user = (state = intialState, action = {}) => {
    switch (action.type) {
        case SAVE_USER:
        //console.log("state:", state);
        return{
            ...state,
            userId : action.userId,
            phone : action.phone,
            email : action.email
        }
        default:
        return state;
    }
}