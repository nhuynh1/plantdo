import React from 'react';

import TodoForm from './TodoForm'
import TodoByDate from './TodoByDate';

const TodoDashboardPage = () => {
    return (
        <>
            <TodoForm />
            <TodoByDate />
        </>
    )
}

export default TodoDashboardPage;