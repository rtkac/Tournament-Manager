import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'router/routes';

const PublicRoutes = (props: PublicRoutesProps) => {
  const { isAuthenticated, restricted, path, component, exact } = props;

  return (
    isAuthenticated && restricted ? (
      <Redirect to={ROUTES.PROFILE} />
    ) : (
      <Route path={path} component={component} exact={exact} />
    )
  )
};

interface PublicRoutesProps {
  exact: boolean;
  isAuthenticated: boolean;
  restricted?: boolean;
  path: string;
  component: React.FunctionComponent;
};

export default PublicRoutes;