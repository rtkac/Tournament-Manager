import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';

import MainRouter from './containers/MainRouter.container';
import { store } from './helpers/redux/store/configure-store';

import './App.css';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Router basename={`${process.env.PUBLIC_URL}/`}>
            <Switch>
              <MainRouter />
            </Switch>
          </Router>
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
