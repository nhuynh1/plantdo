import React, { useContext } from 'react';
import moment from 'moment';

import TodosContext from '../contexts/todos-context';
import DaysViewContext from '../contexts/days-view-context';
import TodoList from './TodoList';

import '../styles/TodoByDate.css';


const renderByDate = (todosByDate, daysFromFirstDate) => {
    moment.updateLocale('en', {
        calendar: {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastWeek: '[Last] dddd',
            nextWeek: '[Next] dddd',
            sameElse: 'L'
        }
    });
    return todosByDate.map((todos, index) => (
            <div className="TodoByDate" key={`day-${index}`}>
                <h2
                    className="TodoByDate__date">
                    {index + daysFromFirstDate < 2 ?
                        moment().subtract(index + daysFromFirstDate, 'days').calendar() :
                        moment().subtract(index + daysFromFirstDate, 'days').format('MMM D YYYY')}
                </h2>
                <TodoList todos={todos} hasForm={index + daysFromFirstDate === 0} />
            </div>
        )
    );
}

const sortTodosByDate = (todos, startDay, numDays = 3) => {
    const dateRangeArray = Array.from({ length: numDays }, () => []);
    const startDate = moment().startOf('day').subtract(startDay, 'days');
    const endDate = moment().startOf('day').subtract(startDay + numDays, 'days');

    return todos.filter(todo => {
            return todo.dateActive <= startDate.endOf('day').valueOf()
                && todo.dateActive > endDate.endOf('day').valueOf()
        })
        .sort((a, b) => a.dateActive < b.dateActive ? -1 : 1)
        .reduce((byDate, todo) => {
            const dateActive = moment(todo.dateActive).startOf('day');
            const diffDays = startDate.diff(dateActive, 'days');
            byDate[diffDays] = [todo, ...byDate[diffDays]];
            return byDate;
        }, dateRangeArray);
}

const TodoByDate = () => {
    const { todos } = useContext(TodosContext);
    const { maxShowing } = useContext(DaysViewContext);
    const todosByDate = sortTodosByDate(todos, maxShowing.start);
    return (
        <div className="TodoByDate-container">
            {renderByDate(todosByDate, maxShowing.start)}
        </div>
    )
}

export default TodoByDate;