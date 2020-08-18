import React, { useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import TodoList from './TodoList';
import { ScrollLeft, ScrollRight } from './Buttons';
import '../styles/TodoByDate.css';

// Configure moment calendar()
const dateFormat = 'MMM D, YYYY'
moment.updateLocale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: dateFormat,
        nextWeek: dateFormat,
        sameElse: dateFormat
    }
});

const sortTodosByDate = (todos, startDay, numDays) => {
    const startDateSeconds = moment().subtract(startDay, 'days').endOf('day').valueOf();
    const endDateSeconds = moment().subtract(startDay + numDays, 'days').endOf('day').valueOf();
    const datesArray = Array.from({ length: numDays }, (v, index) =>
        [moment().subtract(startDay + index, "days").format('YYYY-MM-DD'), []]
    )
    const dateMap = new Map(datesArray);
    todos.filter(todo => todo.dateActive <= startDateSeconds && todo.dateActive > endDateSeconds)
        .sort((a, b) => a.dateActive < b.dateActive ? -1 : 1)
        .forEach(todo => {
            const dateActiveString = moment(todo.dateActive).format('YYYY-MM-DD');
            dateMap.set(dateActiveString, [...dateMap.get(dateActiveString), todo]);
        })
    return [...dateMap];
}

const TodoByDate = () => {
    const { todos, startDay, numDays } = useContext(AppContext);
    const todosByDate = sortTodosByDate(todos, startDay, numDays);

    return (
        <div className="TodoByDate-container">
            {todosByDate.map(([date, todos]) => (
                <div className="TodoByDate" key={date}>
                    <div className="TodoByDate__header">
                        {numDays === 1 && (<ScrollLeft color={'#77B255'} />)}
                        <h2 className="TodoByDate__date">
                            {moment(date).calendar()}
                        </h2>
                        {numDays === 1 && (<ScrollRight color={'#77B255'} />)}
                    </div>
                    <TodoList todos={todos} hasForm={moment(date).isSame(moment(), 'day')} />
                </div>
            ))}
        </div>
    )
}

export default TodoByDate;