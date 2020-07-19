import fetch from 'helpers/redux/services/http';
import * as actionTypes from './actionTypes';
import endpoints from './endpoints';

import { StartLoginState } from 'types/login.types';

export const authenticate = () => {
  const promise = fetch(endpoints.AUTH_ENDPOINT);
  return {
    onRequest: actionTypes.FETCH_AUTH_TRIGGERED,
    onFailure: actionTypes.FETCH_AUTH_FAILED,
    onSuccess: actionTypes.FETCH_AUTH_SUCCESS,
    promise,
  };
};

export const logout = () => {
  const promise = fetch(endpoints.LOGOUT_ENDPOINT);
  return {
    onRequest: actionTypes.FETCH_LOGOUT_TRIGGERED,
    onFailure: actionTypes.FETCH_LOGOUT_FAILED,
    onSuccess: actionTypes.FETCH_LOGOUT_SUCCESS,
    promise,
  };
};

export const startLogin = (requestData: StartLoginState) => {
  const promise = fetch(endpoints.LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
  return {
    onRequest: actionTypes.FETCH_LOGIN_START_TRIGGERED,
    onFailure: actionTypes.FETCH_LOGIN_START_FAILED,
    onSuccess: actionTypes.FETCH_LOGIN_START_SUCCESS,
    promise,
  };
};
