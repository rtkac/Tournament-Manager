import React, { useEffect } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { ROUTES } from 'router/routes';

import { authenticate } from 'actions/login.actions';

import { AppState } from 'reducers/index.reducer';

import MainLayout from 'layouts/Main.layout';
import NotFound from 'containers/notFound/NotFound.container';
import Dashboard from 'containers/dashboard/Dashboard.container';
import Login from 'containers/login/Login.container';
import Signup from 'containers/signup/Signup.container';
import Profile from 'containers/profile/Profile.container';
import Spinner from 'components/spinner/Spinner.component';

import PublicRouter from 'router/PublicRoutes.router';
import PrivateRouter from 'router/PrivateRoutes.router';

import { MainRouterLoadingDiv } from 'router/MainRouter.container.style';

const MainRouter = (props: MainRouterProps) => {
  const { isAuthenticating, isAuthenticated, authenticate } = props;

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
    authenticate();
  }, [authenticate]);

  const APP_ROUTES = {
    PUBLIC: [
      {
        path: ROUTES.DASHBOARD,
        component: () => <Dashboard/>,
      },
      {
        path: ROUTES.LOGIN,
        component: () => <Login/>,
        restricted: true,
      },
      {
        path: ROUTES.SIGNUP,
        component: () => <Signup/>,
        restricted: true,
      },
    ],
    PRIVATE: [
      {
        path: ROUTES.PROFILE,
        component: () => <Profile/>,
      },
    ],
  };

  return (
    <MainLayout {...{...props}}>
      {isAuthenticating ? (
        <MainRouterLoadingDiv>
          <Spinner />
        </MainRouterLoadingDiv>
      ) : (
        <Switch>
          {APP_ROUTES.PUBLIC.map((route, index) => (
            <PublicRouter key={index} exact isAuthenticated={isAuthenticated} {...route} />
          ))}
          {APP_ROUTES.PRIVATE.map((route, index) => (
            <PrivateRouter key={index} exact isAuthenticated={isAuthenticated} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      )}
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
  authenticate: () => void;
//   hasAuthenticationFailed: boolean;
//   startActivation: (token: any) => void;
//   logout: () => void;
//   activeUser: ActiveUser;
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