import * as types from '../constants/ActionTypes'



export function auth(values) {

      return {
        type: types.AUTH,
        values:values,
        api: `http://...`
      }
}

export const save_user = (userId, email, phone) => {
  return {
    type: types.SAVE_USER,
    userId,
    email,
    phone
  }
};

