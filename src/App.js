import React, { useReducer, useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { setTodos as _setTodos } from './firebase/actions';

import TodoDashboardPage from './components/TodoDashboardPage';
import Header from './components/Header';

import TodosContext from './contexts/todos-context';
import DaysLoadedContext from './contexts/days-loaded-context';
import DaysViewContext from './contexts/days-view-context';
import todosReducer from './reducers/todos';

import './App.css';
import AboutPage from './components/AboutPage';

function App() {
  const [todos, todosDispatch] = useReducer(todosReducer, []);
  const [loaded, setLoaded] = useState(3);
  const [maxShowing, setMaxShowing] = useState({ start: 0, end: 3 });

  const setTodos = () => {
    _setTodos().then(todos => {
      todosDispatch({
        type: 'SET_TODOS',
        todos
      })
    })
  }

  useEffect(() => {
    setTodos()
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <TodosContext.Provider value={{ todos, todosDispatch }}>
              <DaysViewContext.Provider value={{ maxShowing, setMaxShowing }}>
                <DaysLoadedContext.Provider value={{ loaded, setLoaded }}>
                  <Header />
                  <TodoDashboardPage />
                </DaysLoadedContext.Provider>
              </DaysViewContext.Provider>
            </TodosContext.Provider>
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
