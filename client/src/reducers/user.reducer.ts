import * as actionTypes from '../actions/actionTypes';
import { UserState } from 'types/user.types';

const initialState: UserState = {
  isAuthenticating: false,
  isAuthenticated: false,
  info: {
    accessToken: '',
    email: '',
    name: '',
    lastName: '',
  },
};

export default function userReducer(state = initialState, action): UserState {
  console.log('............ USER REDUCER ..............');
  console.log(action);
  switch (action.type) {
    case actionTypes.FETCH_AUTH_TRIGGERED: {
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
      }
    }
    case actionTypes.FETCH_AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: action.response.success,
      }
    }
    case actionTypes.FETCH_AUTH_FAILED: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
      }
    }
    case actionTypes.FETCH_LOGIN_START_TRIGGERED: {
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
      }
    }
    case actionTypes.FETCH_LOGIN_START_FAILED: {
      return {
        ...state,
      }
    }
    case actionTypes.FETCH_LOGIN_START_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        info: {
          accessToken: action.response.accessToken,
          email: action.response.email,
          name: action.response.name,
          lastName: action.response.lastname,
        }
      }
    }
    default: {
      return state;
    }
  }
}