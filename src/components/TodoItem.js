import React, { useContext, useState } from 'react';

import TodosContext from '../contexts/todos-context';

import Plant from './Plant';

// import checkbox from '../svgs/done.svg';
import '../styles/TodoItem.css';

const TodoItem = ({ todo }) => {

    const [isComplete, setIsComplete] = useState(todo.isComplete);
    const { todosDispatch } = useContext(TodosContext);

    const onToggleComplete = (id) => (e) => {
        setIsComplete(e.target.checked);
        todosDispatch({
            type: 'COMPLETE_TODO',
            isComplete: e.target.checked,
            id
        });
    }

    const onDelete = (id) => () => {
        todosDispatch({
            type: 'DELETE_TODO',
            id
        });
    }

    return (
        <div className="TodoItem">
            <div className="TodoItem__checkbox">
                <input
                    className="screen-reader-only TodoItem__real-checkbox"
                    type="checkbox"
                    id={`item-${todo.id}`}
                    checked={todo.isComplete}
                    onChange={onToggleComplete(todo.id)} />
                <label
                    className="TodoItem__label"
                    htmlFor={`item-${todo.id}`}>
                    <span className="TodoItem__custom-checkbox"></span>
                    <span>{todo.task}</span>
                </label>
            </div>
            <button
                type="button"
                onClick={onDelete(todo.id)}>
                Delete
            </button>
            {isComplete && <Plant />}
        </div>
    )
}

export default TodoItem;