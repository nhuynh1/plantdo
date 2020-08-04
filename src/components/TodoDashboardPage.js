import React, { useReducer } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import TodosContext from '../contexts/todos-context';
import todosReducer from '../reducers/todos';

import TodoForm from './TodoForm'
import TodoByDate from './TodoByDate';

const TodoDashboardPage = () => {
    const initialTodosState = [
        {
            task: "Pick up dry cleaning", 
            isComplete: false, 
            dateAdded: moment().valueOf(),
            id: uuidv4()
        },
        {
            task: "Write blog about React", 
            isComplete: false, 
            dateAdded: moment().subtract(1, 'days').valueOf(),
            id: uuidv4()
        },
        {
            task: "Clean oven", 
            isComplete: true, 
            dateAdded: moment().subtract(2, 'days').valueOf(),
            id: uuidv4()
        }
    ]
    const [todos, todosDispatch] = useReducer(todosReducer, initialTodosState);

    return (
        <TodosContext.Provider value={{ todos, todosDispatch}}>
            <TodoForm />
            <TodoByDate />
        </TodosContext.Provider>
    )
}

export default TodoDashboardPage;