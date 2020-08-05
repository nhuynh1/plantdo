import React, { useContext, useState } from 'react';

import TodosContext from '../contexts/todos-context';

import Plant from './Plant';

// import checkbox from '../svgs/done.svg';
import '../styles/TodoItem.css';

const TodoItem = ({ todo }) => {

    const [isComplete, setIsComplete] = useState(todo.isComplete);
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
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

    const onSave = (id) => () => {
        setIsEditing(false);
        todosDispatch({
            type: 'UPDATE_TODO',
            id,
            task
        })
    }

    const onKey = (id) => (e) => {
        if (e.charCode === 13) {
            onSave(id)();
        }
    }

    return (
        <div className="TodoItem">
            <div className="TodoItem__checkbox">
                <input
                    className="screen-reader-only"
                    type="checkbox"
                    id={`item-${todo.id}`}
                    checked={todo.isComplete}
                    onChange={onToggleComplete(todo.id)} />
                <label
                    className="TodoItem__label"
                    htmlFor={`item-${todo.id}`}>
                    {todo.task}
                </label>
            </div>
            {/* {isEditing ? 
                (<>
                    <input 
                        type="text" 
                        value={task} 
                        onChange={(e) => setTask(e.target.value)} 
                        onKeyPress={onKey(todo.id)}/>
                    <button onClick={onSave(todo.id)}>x</button>
                </>) : 
                <span onClick={() => setIsEditing(true)}>{task}</span>} */}
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