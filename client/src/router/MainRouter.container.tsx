import React, { useEffect } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';

import { ROUTES } from 'router/routes';

import { authenticate } from 'actions/login.actions';

import { AppState } from 'reducers/index.reducer';

import MainLayout from 'layouts/Main.layout';
import ProfileLayout from 'layouts/ProfileLayout.subLayout';
import NotFound from 'containers/notFound/NotFound.container';
import Dashboard from 'containers/dashboard/Dashboard.container';
import Login from 'containers/login/Login.container';
import Signup from 'containers/signup/Signup.container';
import Profile from 'containers/profile/Profile.container';
import ProfileEdit from 'containers/profile-edit/ProfileEdit.container';
import ChangePassword from 'containers/changePassword/ChangePassword.container';
import Spinner from 'components/spinner/Spinner.component';

import PublicRouter from 'router/PublicRoutes.router';
import PrivateRouter from 'router/PrivateRoutes.router';

import { MainRouterLoadingDiv } from 'router/MainRouter.container.style';

const MainRouter = (props: MainRouterProps) => {
  const { t, history, match, location, isAuthenticating, isAuthenticated, authenticate } = props;

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

  const historyProps = {
    t,
    history,
    match,
    location,
  };

  const APP_ROUTES = {
    PUBLIC: [
      {
        path: ROUTES.DASHBOARD,
        component: Dashboard,
        layout: '',
      },
      {
        path: ROUTES.LOGIN,
        component: Login,
        restricted: true,
        layout: '',
      },
      {
        path: ROUTES.SIGNUP,
        component: Signup,
        restricted: true,
        layout: '',
      },
    ],
    PRIVATE: [
      {
        path: ROUTES.PROFILE,
        component: Profile,
        layout: ProfileLayout,
      },
      {
        path: ROUTES.PROFILE_EDIT,
        component: ProfileEdit,
        layout: ProfileLayout,
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        component: ChangePassword,
        layout: ProfileLayout,
      },
    ],
  };

  return (
    <MainLayout {...props}>
      {isAuthenticating ? (
        <MainRouterLoadingDiv>
          <Spinner />
        </MainRouterLoadingDiv>
      ) : (
        <Switch>
          {APP_ROUTES.PUBLIC.map((route, index) => (
            <PublicRouter
              key={index}
              exact
              isAuthenticated={isAuthenticated}
              router={PublicRouter}
              {...route}
              {...historyProps}
            />
          ))}
          {APP_ROUTES.PRIVATE.map((route, index) => (
            <PrivateRouter
              key={index}
              exact
              isAuthenticated={isAuthenticated}
              router={PrivateRouter}
              {...route}
              {...historyProps}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      )}
    </MainLayout>
  );
};

interface MainRouterProps extends RouteComponentProps {
  t: any;
  history: History<LocationState>;
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

export default withRouter(
  connect(mapStateToProps, {
    authenticate,
  })(MainRouter),
);
