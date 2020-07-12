import { combineReducers } from 'redux';

import appStateReducer from 'reducers/appState.reducer';
import userReducer from 'reducers/user.reducer';

const mainReducer = combineReducers({
    appState: appStateReducer,
    user: userReducer,
});

export default mainReducer;