import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import mainReducer from 'reducers/index.reducer';
import promiseMiddleware from '../middleware/promise-middleware';

const middleware = [thunk, promiseMiddleware];

const isDebugMode = process.env.REACT_APP_DEBUG_MODE === 'true';

const applyPersistState = (window as any) && persistState(['user'], { key: 'cache' });
const applyReduxDevTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && isDebugMode
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const finalCreateStore = compose<any>(
  applyMiddleware(...middleware),
  applyPersistState,
  applyReduxDevTools,
)(createStore);

export const store = finalCreateStore(mainReducer);