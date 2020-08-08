import React, { useReducer, useState } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';


import TodoDashboardPage from './components/TodoDashboardPage';
import Header from './components/Header';

import TodosContext from './contexts/todos-context';
import DaysLoadedContext from './contexts/days-loaded-context';
import todosReducer from './reducers/todos';

import './App.css';

function App() {
  const initialTodosState = [
    {
      task: "Pick up dry cleaning",
      isComplete: false,
      dateAdded: moment().valueOf(),
      dateActive: moment().valueOf(),
      id: uuidv4()
    },
    {
      task: "Write blog about React",
      isComplete: true,
      dateAdded: moment().subtract(2, 'days').valueOf(),
      dateActive: moment().subtract(2, 'days').valueOf(),
      id: uuidv4()
    }
    // ,
    // {
    //     task: "Clean oven", 
    //     isComplete: true, 
    //     dateAdded: moment().subtract(2, 'days').valueOf(),
    //     id: uuidv4()
    // },
    // {
    //     task: "Buy milk", 
    //     isComplete: true, 
    //     dateAdded: moment().subtract(3, 'days').valueOf(),
    //     id: uuidv4()
    // },
    // {
    //     task: "Write will", 
    //     isComplete: true, 
    //     dateAdded: moment().subtract(5, 'days').valueOf(),
    //     id: uuidv4()
    // }
  ]

  const [todos, todosDispatch] = useReducer(todosReducer, initialTodosState);
  const [loaded, setLoaded] = useState(3);

  return (
    <div className="App">

      <TodosContext.Provider value={{ todos, todosDispatch }}>
        <DaysLoadedContext.Provider value={{ loaded, setLoaded }}>
          <Header />
          <TodoDashboardPage />
        </DaysLoadedContext.Provider>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
