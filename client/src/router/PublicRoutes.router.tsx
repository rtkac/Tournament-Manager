import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'router/routes';

const PublicRoutes = (props) => {
  const { isAuthenticated, restricted, path, exact, component: Component, layout: Layout, ...rest } = props;

  return isAuthenticated && restricted ? (
    <Redirect to={ROUTES.PROFILE} />
  ) : (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        Layout ? (
          <Layout {...rest}>
            <Component {...rest} />
          </Layout>
        ) : (
          <Component {...rest} />
        )
      }
    />
  );
};

export default PublicRoutes;
