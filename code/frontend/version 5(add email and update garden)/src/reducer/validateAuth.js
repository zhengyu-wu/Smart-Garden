import * as types from '../constants/ActionTypes'



const initialState = {
    result:false,
    loading:false,
    validate:false,
    data:{}
}

export default function  validateAuth(state = initialState, action) {

    switch (action.type) {


        case types.AUTH + types.START:
            return {
                ...state,
                result:false,
                loading:true,
                validate:false,
                data:action.response
            }

        case types.AUTH + types.SUCCESS:
            return {
                ...state,
                result:true,
                loading:false,
                validate:true,
                data:action.response
            }

        case types.AUTH  + types.FAIL:
            return {
                ...state,
                result:false,
                loading:false,
                validate:true,
                data:action.error
            }

        default:
            return state
    }
}