import React, { useContext } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from './PrivateRoute';
import AppContext from '../contexts/app-context';

import AboutPage from '../components/AboutPage';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import TodoDashboardPage from '../components/TodoDashboardPage';
import LandingPage from '../components/LandingPage';
import FourOhFour from '../components/FourOhFour';

const history = createBrowserHistory();

const AppRouter = () => {
    const { numDays } = useContext(AppContext);
    return (
        <Router history={history}>
            {numDays > 1 ? <Header /> : <HeaderMobile />}
            <Switch>
                <PrivateRoute path="/dashboard" exact={true}>
                    <TodoDashboardPage />
                </PrivateRoute>
                <Route path="/about" component={AboutPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/" component={LandingPage} exact={true} />
                <Route component={FourOhFour} />
            </Switch>
        </Router>
    );
}

export { history, AppRouter as default }