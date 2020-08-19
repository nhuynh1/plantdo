import React, { useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import { sortTodosByDate } from '../selectors/todos';
import TodoList from './TodoList';
import { ScrollLeft, ScrollRight } from './Buttons';
import '../styles/TodoByDate.css';

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