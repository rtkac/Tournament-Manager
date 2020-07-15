import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import MainRouter from 'router/MainRouter.container';
import { store } from 'helpers/redux/store/configure-store';

import './App.css';

const engine = new Styletron();

const App: React.FC<WithTranslation> = (props, rest) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Provider store={store}>
        <Router basename={`${process.env.PUBLIC_URL}/`}>
          <Switch>
            <MainRouter t={props.t} {...{...rest}} />
          </Switch>
        </Router>
      </Provider>
    </BaseProvider>
  </StyletronProvider>
);

export default withTranslation()(App);
