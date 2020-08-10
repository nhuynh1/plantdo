import React from 'react';

import TodoForm from './TodoForm'
import TodoItem from '../components/TodoItem';

import '../styles/TodoList.css';

const TodoList = ({ todos, hasForm }) => {
    return (
        <div className="TodoList">
            {hasForm && <TodoForm />}
            {todos.map(todo => (
                <TodoItem todo={todo} key={`item-${todo.id}`} />
            ))}
        </div>
    )
}

export default TodoList;