import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'router/routes';

const PrivateRoutes = (props) => {
  const { isAuthenticated, path, exact, component: Component, layout: Layout, ...rest } = props;

  return isAuthenticated ? (
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
  ) : (
    <Redirect to={ROUTES.LOGIN} />
  );
};

export default PrivateRoutes;
