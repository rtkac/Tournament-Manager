import React, { useEffect } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { routes as ROUTES } from 'config/routes';

import { authenticate } from 'actions/login.actions';

import { AppState } from 'reducers/index.reducer';

import MainLayout from 'layouts/Main.layout';
import NotFound from 'containers/notFound/NotFound.container';
import Dashboard from 'containers/dashboard/Dashboard.container';
import Login from 'containers/login/Login.container';

const MainRouter = (props: MainRouterProps) => {
//   const { isAuthenticated, isAuthenticating, hasAuthenticationFailed, startActivation } = props;

//   if (hasAuthenticationFailed) {
//     return (
//       'fail'
//     );
//   }
//   if (isAuthenticating && !isAuthenticated) {
//     return (
//       'loading...'
//     );
//   }

  useEffect(() => {
    // props.authenticate();
  }, []);

  const routes = [
    {
      path: ROUTES.DASHBOARD,
      component: () => <Dashboard/>,
    },
    {
      path: ROUTES.LOGIN,
      component: () => <Login/>,
    },
    {
      path: undefined,
      component: NotFound,
    },
  ];

  console.log('///////////////////////')
  console.log(props);
  console.log(props.t('header.logout'));

  return (
    <MainLayout {...{...props}}>
      <Switch>
        {routes.map((route, index) =>
          <Route key={index} path={route.path} exact component={route.component} />,
        )}
      </Switch>
    </MainLayout>
  );
};

interface MainRouterProps extends RouteComponentProps {
  t: any;
  history: any;
  match: any;
  location: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
//   hasAuthenticationFailed: boolean;
//   startActivation: (token: any) => void;
//   logout: () => void;
//   activeUser: ActiveUser;
  authenticate: () => void;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticating: state.user.isAuthenticating,
  isAuthenticated: state.user.isAuthenticated,
//   hasAuthenticationFailed: state.user.hasAuthenticationFailed,
//   activeUser: state.user.activeUser,
});

export default withRouter(connect(mapStateToProps, {
  authenticate,
})(MainRouter));