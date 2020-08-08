import React, { useContext } from 'react';

import TodosContext from '../contexts/todos-context';

const DeleteButton = ({ todo }) => {
    const { todosDispatch } = useContext(TodosContext);
    
    const onDelete = (id) => () => {
        todosDispatch({
            type: 'DELETE_TODO',
            id
        });
    }
    
    return (
        <button
            aria-label={`Delete ${todo.task}`}
            className="TodoItem__button TodoItem__button--delete"
            type="button"
            onClick={onDelete(todo.id)}>
        </button>
    )
}

export default DeleteButton;