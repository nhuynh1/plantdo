import React, { useContext, useState } from 'react';
import TodosContext from '../contexts/todos-context';
import moment from 'moment';
import database from '../firebase/firebase';

import '../styles/TodoForm.css';

const TodoFrom = () => {

    const { todosDispatch } = useContext(TodosContext);

    const [todo, setTodo] = useState('')


    const handleOnSubmit = (e) => {
        e.preventDefault();
        const todoData = {
            task: todo,
            isComplete: false, 
            dateAdded: moment().valueOf(),
            dateActive: moment().valueOf()
        }
        database.ref('todos').push(todoData).then((ref) => {
            todosDispatch({
                type: 'ADD_TODO',
                id: ref.key,
                todo: {...todoData}
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