import React, { useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import TodoList from './TodoList';
import { ScrollLeft, ScrollRight } from './Buttons';

import '../styles/TodoByDate.css';




const sortTodosByDate = (todos, startDay, numDays = 3) => {
    const dateRangeArray = Array.from({ length: numDays }, () => []);
    const startDate = moment().startOf('day').subtract(startDay, 'days');
    const endDate = moment().startOf('day').subtract(startDay + numDays, 'days');

    return todos.filter(todo => {
        return todo.dateActive <= startDate.endOf('day').valueOf()
            && todo.dateActive > endDate.endOf('day').valueOf();
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
    const { todos, startDay, numDays } = useContext(AppContext);
    const todosByDate = sortTodosByDate(todos, startDay, numDays);

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
                <div className="TodoByDate__header">
                    {numDays === 1 && (<ScrollLeft />)}
                    <h2
                        className="TodoByDate__date">
                        {index + daysFromFirstDate < 2 ?
                            moment().subtract(index + daysFromFirstDate, 'days').calendar() :
                            moment().subtract(index + daysFromFirstDate, 'days').format('MMM D YYYY')}
                    </h2>
                    {numDays === 1 && (<ScrollRight />)}
                </div>
                <TodoList todos={todos} hasForm={index + daysFromFirstDate === 0} />
            </div>
        )
        );
    }

    return (
        <div className="TodoByDate-container">
            {renderByDate(todosByDate, startDay)}
        </div>
    )
}

export default TodoByDate;