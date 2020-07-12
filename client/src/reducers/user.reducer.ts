import * as actionTypes from '../actions/actionTypes';
import { UserState } from 'types/user.types';

// const initialState: UserState = {
const initialState = {
  // info: {},
  accessToken: '',
  email: '',
  name: '',
  lastName: '',
};

export default function userReducer(state = initialState, action): UserState {
  console.log(action)
  switch (action.type) {
    case actionTypes.FETCH_LOGIN_START_SUCCESS: {
      return {
        ...state,
        accessToken: action.response.accessToken,
        email: action.response.email,
        name: action.response.name,
        lastName: action.response.lastname,
      }
    }
    default: {
      return state;
    }
  }
}