import React, { useEffect } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { AppState } from 'reducers/index.reducer';

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

  const routes = [
    {
      path: '/login',
      component: () => <Login/>,
    },
  ];

  return (
    <>
      {/* <MainLayout> */}
        <Switch>
          {routes.map((route, index) =>
            route.component ? <Route key={index} path={route.path} exact component={route.component} /> : null,
          )}
        </Switch>
      {/* </MainLayout> */}
    </>
  );
};

interface MainRouterProps extends RouteComponentProps {
//   isAuthenticated: boolean;
//   isAuthenticating: boolean;
//   hasAuthenticationFailed: boolean;
//   startActivation: (token: any) => void;
//   logout: () => void;
//   activeUser: ActiveUser;
}

const mapStateToProps = (state: AppState) => ({
//   isAuthenticated: state.user.isAuthenticated,
//   isAuthenticating: state.user.isAuthenticating,
//   hasAuthenticationFailed: state.user.hasAuthenticationFailed,
//   activeUser: state.user.activeUser,
});

export default withRouter(connect(mapStateToProps)(MainRouter));