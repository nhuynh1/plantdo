import React, { useContext, useState } from 'react';
import TodosContext from '../contexts/todos-context';

import '../styles/TodoForm.css';

const TodoFrom = () => {

    const { todosDispatch } = useContext(TodosContext);

    const [todo, setTodo] = useState('')


    const handleOnSubmit = (e) => {
        e.preventDefault();
        todosDispatch({
            type: 'ADD_TODO',
            todo
        });
        setTodo('');
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