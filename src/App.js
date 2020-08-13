import React, { useReducer, useState, useEffect, useContext } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './routers/PrivateRoute';
import { setTodos as _setTodos } from './firebase/actions';
import AppContext from './contexts/app-context';
import AuthContext from './contexts/auth-context';
import todosReducer from './reducers/todos';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import TodoDashboardPage from './components/TodoDashboardPage';
import LandingPage from './components/LandingPage';
import './App.css';

const history = createBrowserHistory();

function App() {

    const [todos, todosDispatch] = useReducer(todosReducer, []);
    const [isLoading, setIsLoading] = useState(true);
    const [maxShowing, setMaxShowing] = useState({ start: 0, end: 3 });
    const { user, isAuthenticated } = useContext(AuthContext);

    const setTodos = (user) => {
        return _setTodos(user).then(todos => {
            todosDispatch({
                type: 'SET_TODOS',
                todos
            });
            setIsLoading(false);
        })
    }

    useEffect(() => {        
        if(isAuthenticated){
            setTodos(user);
        }
    }, [user, isAuthenticated])

    return (
        <div className="App">
            <Router history={history}>
            <Header />
                <Switch>
                    <PrivateRoute path="/dashboard" exact={true}>
                        <AppContext.Provider
                            value={{
                                todos,
                                todosDispatch,
                                maxShowing,
                                setMaxShowing,
                                isLoading,
                                setIsLoading
                            }}>
                            <TodoDashboardPage />
                        </AppContext.Provider>
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
