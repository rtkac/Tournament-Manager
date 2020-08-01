import { combineReducers } from 'redux';

import * as actionTypes from 'actions/actionTypes';

import user from './user.reducer';
import football from './football.reducer';

const appReducer = combineReducers({
  user,
  football,
});

const mainReducer = (state, action) => {
  let updatedState = state;
  if (action.type === actionTypes.FETCH_LOGOUT_TRIGGERED) updatedState = undefined;
  return appReducer(updatedState, action);
};

export type AppState = ReturnType<typeof mainReducer>;
export default mainReducer;
