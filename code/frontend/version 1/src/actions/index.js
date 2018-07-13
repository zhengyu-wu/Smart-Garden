import * as types from '../constants/ActionTypes'



export function auth(values) {

      return {
        type: types.AUTH,
        values:values,
        api: `http://...`
      }
}


