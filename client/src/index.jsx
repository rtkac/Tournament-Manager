import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';

import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const engine = new Styletron();

import './i18n/i18n_config';
import configureStore from 'helpers/redux/store/configure-store';
import App from './App';

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <App/>
            </BaseProvider>
        </StyletronProvider>
    </Provider>,
    document.getElementById('app')
);