import fetch from 'helpers/redux/services/http';
import * as actionTypes from './actionTypes';
import endpoints from './endpoints';

import { SignupState, SignupConfirmationState } from 'types/signup.types';

export const signup = (requestData: SignupState): actionTypes.SignupAction => {
  const promise = fetch(endpoints.SIGNUP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
  return {
    onRequest: actionTypes.FETCH_SIGNUP_TRIGGERED,
    onFailure: actionTypes.FETCH_SIGNUP_FAILED,
    onSuccess: actionTypes.FETCH_SIGNUP_SUCCESS,
    promise,
  };
};

export const signupConfirmation = (requestData: SignupConfirmationState): actionTypes.SignupConfirmationAction => {
  const promise = fetch(endpoints.SIGNUP_CONFIRMATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
  return {
    onRequest: actionTypes.FETCH_SIGNUP_CONFIRMATION_TRIGGERED,
    onFailure: actionTypes.FETCH_SIGNUP_CONFIRMATION_FAILED,
    onSuccess: actionTypes.FETCH_SIGNUP_CONFIRMATION_SUCCESS,
    promise,
  };
};
