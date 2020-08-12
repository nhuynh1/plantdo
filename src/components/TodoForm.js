import React, { useContext, useState } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import AuthContext from '../contexts/auth-context';
import { createTodo } from '../firebase/actions';
import '../styles/TodoForm.css';

const TodoFrom = () => {
    const { todosDispatch } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const [todo, setTodo] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const todoData = {
            task: todo,
            isComplete: false, 
            dateAdded: moment().valueOf(),
            dateActive: moment().valueOf()
        }
        createTodo(todoData, user).then((ref) => {
            todosDispatch({
                type: 'ADD_TODO',
                todo: {...todoData, id: ref.key}
            });
            setTodo('');
        })
    }

    return (
        <form 
            className="TodoForm"
            onSubmit={handleOnSubmit}>
            <input
                className="TodoForm__input-text"
                type="text"
                placeholder="task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} />
            <button 
                className="TodoForm__button"
                type="submit">
                Add
            </button>
        </form>
    );
}

export default TodoFrom;