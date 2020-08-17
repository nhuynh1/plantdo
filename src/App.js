import React, { useEffect, useContext, useCallback } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './routers/PrivateRoute';
import AppContext from './contexts/app-context';
import AuthContext from './contexts/auth-context';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import TodoDashboardPage from './components/TodoDashboardPage';
import LandingPage from './components/LandingPage';
import { setTodos as _setTodos } from './firebase/actions';
import { numDaysByViewportWidth } from './helpers/helpers';
import './App.css';


const history = createBrowserHistory();

function App() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { todosDispatch, setIsLoading, width, numDays, setNumDays } = useContext(AppContext);

    const setTodos = useCallback((user) => {
        _setTodos(user).then(todos => {
            todosDispatch({
                type: 'SET_TODOS',
                todos
            });
            setIsLoading(false);
        });
    }, [todosDispatch, setIsLoading]);

    useEffect(() => {
        if (isAuthenticated) {
            setTodos(user);
        }
    }, [user, isAuthenticated, setTodos]);

    useEffect(() => {
        setNumDays(numDaysByViewportWidth(width))
    }, [width, setNumDays]);

    return (
        <div className="App">
            <Router history={history}>
                {numDays > 1 ? <Header /> : <HeaderMobile />} 
                <Switch>
                    <PrivateRoute path="/dashboard" exact={true}>
                        <TodoDashboardPage />
                    </PrivateRoute>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={LandingPage} exact={true} />
                </Switch>
            </Router>
        </div>
    );
}

export { history, App as default };
