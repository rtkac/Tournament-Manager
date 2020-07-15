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
        isAuthenticated: true,
      }
    }
    case actionTypes.FETCH_AUTH_FAILED: {
      return {
        ...initialState,
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
        ...initialState,
      }
    }
    case actionTypes.FETCH_LOGIN_START_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        info: {
          accessToken: action.response.info.accessToken,
          email: action.response.info.email,
          name: action.response.info.name,
          lastName: action.response.info.lastname,
        }
      }
    }
    case actionTypes.FETCH_LOGOUT_TRIGGERED: {
      return {
        ...state,
      }
    }
    case actionTypes.FETCH_LOGOUT_FAILED: {
      return {
        ...state,
      }
    }
    case actionTypes.FETCH_LOGOUT_SUCCESS: {
      return {
        ...initialState,
      }
    }
    default: {
      return state;
    }
  }
}