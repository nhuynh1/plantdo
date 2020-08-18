import React, { useEffect, useContext, useCallback } from 'react';

import AppContext from './contexts/app-context';
import AuthContext from './contexts/auth-context';
import AppRouter from './routers/AppRouter';

import { setTodos as _setTodos } from './firebase/actions';
import { numDaysByViewportWidth } from './helpers/helpers';

import './App.css';

function App() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { todosDispatch, setIsLoading, width, setNumDays } = useContext(AppContext);

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
            <AppRouter />
        </div>
    );
}

export default App;
