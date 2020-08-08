import React, { useContext } from 'react';
import moment from 'moment';

import TodosContext from '../contexts/todos-context';
import DaysLoadedContext from '../contexts/days-loaded-context';
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


const sortTodosByDate = (todos, numDays) => {    
    const dateRangeArray = Array.from({length: numDays}, () => []);
    const today = moment().startOf('day');

    return todos.sort((a, b) => a.dateActive < b.dateActive ? -1 : 1)
                .reduce((byDate, todo) => {
                    const dateActive = moment(todo.dateActive).startOf('day');
                    const diffDays = today.diff(dateActive, 'days');
                    byDate[diffDays] = [todo, ...byDate[diffDays]];
                    return byDate;
    }, dateRangeArray);
}

const TodoByDate = () => {
    const { todos } = useContext(TodosContext);
    const { loaded } = useContext(DaysLoadedContext);
    const todosByDate = sortTodosByDate(todos, loaded);
    return (
        <div className="TodoByDate-container">
            {renderByDate(todosByDate)}
        </div>
    )
}

export default TodoByDate;