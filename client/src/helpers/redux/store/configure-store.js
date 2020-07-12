import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import appConfig from 'appConfig';
import envConfig from 'envConfig';
import mainReducer from 'reducers/index';

import promiseMiddleware from '../middleware/promise-middleware';

const middlewares = [thunk, promiseMiddleware];
if (appConfig.ENABLED_REDUX_LOGGER) {
    middlewares.push(logger);
}

const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && envConfig.SHOW_REDUX_DEV_TOOLS ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(mainReducer, initialState);
}