import fetch from 'helpers/redux/services/http';
import * as actionTypes from './actionTypes';
import endpoints from './endpoints';

export const logout = () => {
  const promise = fetch(endpoints.LOGOUT_ENDPOINT);
  return {
    onRequest: actionTypes.FETCH_LOGOUT_TRIGGERED,
    onFailure: actionTypes.FETCH_LOGOUT_FAILED,
    onSuccess: actionTypes.FETCH_LOGOUT_SUCCESS,
    promise,
  };
}

// import { NBToken, ZenLoginState } from '../types';

export const startLogin = () => {
  const promise = fetch(endpoints.LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      email: 'test2@example.com',
      password: '123456',
    }),
  });
  return {
    onRequest: actionTypes.FETCH_LOGIN_START_TRIGGERED,
    onFailure: actionTypes.FETCH_LOGIN_START_FAILED,
    onSuccess: actionTypes.FETCH_LOGIN_START_SUCCESS,
    promise,
  };
};

const finishLogin = (response, dispatch, state) => {
  console.log(response);
  // localStorage.setItem('accessToken', response.accessToken);
  dispatch({
    onRequest: actionTypes.FETCH_LOGIN_FINISH_TRIGGERED,
    onFailure: actionTypes.FETCH_LOGIN_FINISH_FAILED,
    onSuccess: actionTypes.FETCH_LOGIN_FINISH_SUCCESS,
  });
};