import React from 'react';
import { Switch, Route } from 'react-router-dom';
import appConfig from 'appConfig';

import MainLayout from 'layouts/Main.layout';
import AuthLayout from 'layouts/Auth.layout';
// import Auth from './auth.helper';

import NotFound from './containers/notfound/Notfound.container';
import Home from './containers/home/Home.container';
import Login from './containers/login/Login.container';

const {LAYOUTS} = appConfig;

const AppRoute = ({layout, path, component, ...rest}) => (
    layout === LAYOUTS.AUTH ? (
        <AuthLayout>
            <Route {...{path, component, ...rest}} />
        </AuthLayout>
    ) : (
        <MainLayout>
            <Route {...{path, component, ...rest}} />
        </MainLayout>
    )
);

const AppRouter = () => {
    return (
        <Switch>
            <AppRoute path="/" exact component={Home} />
            <AppRoute layout={LAYOUTS.AUTH} path="/login" exact component={Login} />
            <AppRoute component={NotFound} />
        </Switch>
    )
}

export default AppRouter;