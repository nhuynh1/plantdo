import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Swipeable } from 'react-swipeable';
import moment from 'moment';

import AppContext from '../contexts/app-context';
import AuthContext from '../contexts/auth-context';
import { completeTodo, updateTodo } from '../firebase/actions';

import { Delete as DeleteButton, Migrate as MigrateButton } from './Buttons';
import Plant from './Plant';

import '../styles/TodoItem.css';

const TodoItem = ({ todo }) => {
    const { todosDispatch } = useContext(AppContext);
    const { user } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    const node = useRef();
    const taskRef = useRef(task);
    const itemNode = useRef(null);
    const swipeAmount = useRef(0);

    const updatePos = () => {
        if (itemNode.current) {
            itemNode.current.style.transform = `translateX(-${swipeAmount.current}px)`;
        }
    }

    const handleEndSwipeSuccess = (e) => {
        const threshold = moment(todo.dateActive).isSame(moment(), 'day') ? 56 : 112;
        swipeAmount.current = e.deltaX < threshold * 0.90 ? 0 : threshold;
        requestAnimationFrame(updatePos);
    }

    const handleSwiping = (e) => {
        if (e.deltaX < 0) return;
        swipeAmount.current = e.absX;
        requestAnimationFrame(updatePos);
    }

    const handleEndSwipeNoEffect = () => {
        swipeAmount.current = 0;
        requestAnimationFrame(updatePos);
    }

    const swipeConfig = {
        delta: 20,
        trackMouse: false,
        preventDefaultTouchmoveEvent: false
    }

    const onSave = useCallback((task) => {
        // only update the database and dispatch if the task actually has changed
        if (todo.task !== task) {
            updateTodo(todo.id, user, task).then(() => {
                todosDispatch({
                    type: 'UPDATE_TODO',
                    id: todo.id,
                    todo: { task }
                });
            })
        }
        setIsEditing(false);
    }, [todo, todosDispatch, user])

    const handleEnterKey = (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        }
        if (e.keyCode === 13) {
            onSave(task);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (node.current.contains(e.target)) return;
            onSave(taskRef.current);
        }

        if (isEditing) {
            document.addEventListener('click', handleClickOutside);
            node.current.querySelector('input').focus();
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [isEditing, onSave]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            swipeAmount.current = 0;
            requestAnimationFrame(updatePos);
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }

    }, [])

    const onToggleComplete = (id) => (e) => {
        const isComplete = e.target.checked
        completeTodo(id, user, isComplete).then(() => {
            todosDispatch({
                type: 'COMPLETE_TODO',
                isComplete,
                id
            });
        })

    }

    return (
        <>
            <Swipeable 
                {...swipeConfig} 
                style={{ overflow: 'hidden', width: '100%'}} 
                onSwipedLeft={(e) => handleEndSwipeSuccess(e)}
                onSwiping={(e) => handleSwiping(e)}
                onSwipedRight={handleEndSwipeNoEffect}
                onSwipedDown={handleEndSwipeNoEffect}
                onSwipedUp={handleEndSwipeNoEffect} >
                <div className="TodoItem" ref={itemNode} style={{ position: 'relative' }}>
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
                                        aria-label="task"
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
                                        aria-label="Select to edit"
                                        className="TodoItem__task"
                                        id={`item-${todo.id}-task`}
                                        onKeyDown={(e) => [13, 32].includes(e.keyCode) && setIsEditing(true)}
                                        onClick={() => setIsEditing(true)}
                                        tabIndex="0">
                                        {todo.task}
                                    </span>
                                )}
                        </div>
                    </div>

                    {(!isEditing) &&
                    (<div className="TodoItem__button-group">
                        <DeleteButton todo={todo} color={'#666666'} />
                        {!moment(todo.dateActive).isSame(moment(), 'day') &&
                            <MigrateButton todo={todo} color={'#666666'} />}
                    </div>
                    )}
                    <div className="TodoItem__options-group">
                        <DeleteButton todo={todo} color={'#FFFFFF'} />
                        {!moment(todo.dateActive).isSame(moment(), 'day') &&
                            <MigrateButton todo={todo} color={'#FFFFFF'} />}
                    </div>
                </div>

            </Swipeable>
            {todo.isComplete && <Plant />}
        </>
    )
}

export default TodoItem;