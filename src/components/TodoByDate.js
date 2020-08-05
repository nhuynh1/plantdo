import React, { useContext } from 'react';
import moment from 'moment';
import TodosContext from '../contexts/todos-context';

import TodoList from './TodoList';

import '../styles/TodoByDate.css';

const renderByDate = (todosByDate) => {
    

    return todosByDate.map((todos, index) => {
        moment.updateLocale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[Last] dddd',
                nextWeek : '[Next] dddd',
                sameElse : 'L'
            }
        });
        
        return (
            <div className="TodoByDate" key={`day-${index}`}>
                <h2 className="TodoByDate__date">{index < 2 ? moment().subtract(index, 'days').calendar() : 
                    moment().subtract(index, 'days').format('MMM D YYYY')}</h2>
                <TodoList todos={todos} />
            </div>
        )
    })
}


const sortTodosByDate = (todos) => {    
    const dateRangeArray = Array.from({length: 6}, (value, index) => []);

    


    const today = moment().startOf('day');

    return todos.reduce((byDate, todo) => {
        const dateAdded = moment(todo.dateAdded).startOf('day');
        const diffDays = today.diff(dateAdded, 'days');
        byDate[diffDays] = [...byDate[diffDays], todo];
        return byDate;
    }, dateRangeArray);
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