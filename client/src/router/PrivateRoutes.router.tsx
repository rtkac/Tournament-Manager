import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'router/routes';

const PrivateRoutes = (props: PrivateRoutesProps) => {
  const { isAuthenticated, path, component, exact } = props;

  return (
    isAuthenticated ? (
      <Route path={path} component={component} exact={exact} />
    ) : (
      <Redirect to={ROUTES.LOGIN} />
    )
  )
};

interface PrivateRoutesProps {
  exact: boolean;
  isAuthenticated: boolean;
  restricted?: boolean;
  path: string;
  component: React.FunctionComponent;
};

export default PrivateRoutes;