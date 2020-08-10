import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import moment from 'moment';

import TodosContext from '../contexts/todos-context';
import { completeTodo, updateTodo } from '../firebase/actions';

import DeleteButton from './DeleteButton';
import MigrateButton from './MigrateButton';
import Plant from './Plant';

import '../styles/TodoItem.css';

const TodoItem = ({ todo }) => {
    // Context
    const { todosDispatch } = useContext(TodosContext);

    // States
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    
    // Refs
    const node = useRef();
    const taskRef = useRef(task);

    const onSave = useCallback((task) => {
        updateTodo(todo.id, task).then(() => {
            todosDispatch({
                type: 'UPDATE_TODO',
                id: todo.id,
                todo: {task}
            });
            setIsEditing(false);
        })
        
        
        
    }, [todo.id, todosDispatch])

    const handleEnterKey = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault()
        }
        if (e.charCode === 13 || e.keyCode === 13) {
            onSave(task);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (node.current.contains(e.target)) return;
            onSave(taskRef.current);
        }
        
        if(isEditing){
            document.addEventListener('click', handleClickOutside);
            node.current.querySelector('input').focus();
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            
        }
    }, [isEditing, onSave]);

    const onToggleComplete = (id) => (e) => {
        const isComplete = e.target.checked
        completeTodo(id, isComplete).then(() => {
            todosDispatch({
                type: 'COMPLETE_TODO',
                isComplete,
                id
            });
        })

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
                            className="TodoItem__edit-text-input"
                            onChange={(e) => {
                                taskRef.current = e.target.value;
                                setTask(e.target.value)
                            }}
                            onKeyDown={handleEnterKey}
                            type="text"
                            value={task} />
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

            {todo.isComplete && <Plant />}
        </div>
    )
}

export default TodoItem;