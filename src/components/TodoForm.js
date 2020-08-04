import React, { useContext, useState } from 'react';
import TodosContext from '../contexts/todos-context';

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
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                placeholder="task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">
                Add
            </button>
        </form>
    );
}

export default TodoFrom;