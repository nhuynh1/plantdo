import React from 'react';

import TodoItem from '../components/TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                <TodoItem todo={todo} key={`item-${todo.id}`} />
            ))}
        </div>
    )
}

export default TodoList;