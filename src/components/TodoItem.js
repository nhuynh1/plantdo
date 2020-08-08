import React, { useContext, useState, useRef, useEffect } from 'react';

import moment from 'moment';
import TodosContext from '../contexts/todos-context';

import DeleteButton from './DeleteButton';
import Plant from './Plant';

import '../styles/TodoItem.css';
import MigrateButton from './MigrateButton';

const TodoItem = ({ todo }) => {
    
    // States
    const [isComplete, setIsComplete] = useState(todo.isComplete);
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    
    // Context
    const { todosDispatch } = useContext(TodosContext);

    // Refs
    const node = useRef();
    const taskRef = useRef(task);

    useEffect(() => {
        if(isEditing){
            document.addEventListener('click', handleClickOutside);
            node.current.querySelector('input').focus();
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            
        }
    }, [isEditing]);

    const onToggleComplete = (id) => (e) => {
        setIsComplete(e.target.checked);
        todosDispatch({
            type: 'COMPLETE_TODO',
            isComplete: e.target.checked,
            id
        });
    }

    

    const onSave = (task) => {
        todosDispatch({
            type: 'UPDATE_TODO',
            id: todo.id,
            todo: {task}
        });
        setIsEditing(false);
    }

    const handleEnterKey = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault()
        }
        if (e.charCode === 13 || e.keyCode === 13) {
            onSave(task);
        }

    }



    const handleClickOutside = (e) => {
        if (node.current.contains(e.target)) return;
        onSave(taskRef.current);
    }

    return (
        <div className="TodoItem">
            <div className="TodoItem__checkbox">
                <input
                    aria-labelledby={`item-${todo.id}-task`}
                    className="screen-reader-only TodoItem__real-checkbox"
                    type="checkbox"
                    id={`item-${todo.id}`}
                    checked={todo.isComplete}
                    onChange={onToggleComplete(todo.id)} />
                <label
                    className="TodoItem__label"
                    htmlFor={`item-${todo.id}`}>
                    <span className="TodoItem__custom-checkbox"></span>
                </label>
                <div 
                    className="TodoItem__task-wrapper"
                    ref={node}>
                {isEditing ? (
                    <>
                        <input
                            className="testing-node"
                            onChange={(e) => {
                                taskRef.current = e.target.value;
                                setTask(e.target.value)
                            }}
                            onKeyDown={handleEnterKey}
                            type="text"
                            value={task} />
                        <button 
                            className="screen-reader-only"
                        type="button" onClick={() => onSave(task)}>
                            save
                        </button>
                    </>
                ) : (
                        <span
                            className="TodoItem__task"
                            id={`item-${todo.id}-task`}
                            onKeyDown={(e) => [13, 32].includes(e.keyCode) && setIsEditing(true) }
                            onClick={() => setIsEditing(true)}
                            tabIndex="0">
                            {todo.task}
                        </span>
                    )}
                </div>
            </div>
            {!isEditing &&
                (<div className="TodoItem__button-group">
                    <DeleteButton todo={todo} />
                    {!moment(todo.dateActive).isSame(moment(), 'day') && 
                        <MigrateButton todo={todo} />}
                </div>
            )}

            {isComplete && <Plant />}
        </div>
    )
}

export default TodoItem;