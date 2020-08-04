import React, { useContext, useState } from 'react';
import TodosContext from '../contexts/todos-context';

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
            <input
                type="checkbox"
                id={`item-${todo.id}`}
                checked={todo.isComplete}
                onChange={onToggleComplete(todo.id)} />
            <label 
                htmlFor={`item-${todo.id}`}>
                {todo.task}
            </label>
            <button 
                type="button"
                onClick={onDelete(todo.id)}>
                Delete
            </button>
            { isComplete && <span className="TodoItem-flower">flower</span>}
        </div>
    )
}

export default TodoItem;