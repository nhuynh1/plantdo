import React, { useContext } from 'react';
import moment from 'moment';
import TodosContext from '../contexts/todos-context';

import TodoList from './TodoList';

import '../styles/TodoByDate.css';

const renderByDate = (todosByDate) => {
    let jsx = [];
    Object.entries(todosByDate).forEach(([date, todos]) => {
        jsx.push((
            <div className="TodoByDate" key={date}>
                <p>{date}</p>
                <TodoList todos={todos} />
            </div>
        ))
    })
    return jsx;
}

const sortTodosByDate = (todos) => {
    return todos.reduce((byDate, todo) => {
        const formattedDate = moment(todo.dateAdded).format('MMM D YYYY');
        const dateArray = byDate[formattedDate] || [];
        byDate[formattedDate] = [...dateArray, todo];
        return byDate;
    }, {});
}

const TodoByDate = () => {
    const { todos } = useContext(TodosContext);
    const todosByDate = sortTodosByDate(todos);
    return (
        <div className="TodoByDate-container">
            {renderByDate(todosByDate)}
        </div>
    )
}

export default TodoByDate;