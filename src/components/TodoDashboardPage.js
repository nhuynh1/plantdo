import React from 'react';
import TodoByDate from './TodoByDate';
import { Today, ScrollLeft, ScrollRight } from './Buttons';
import '../styles/TodoDashboardPage.css'

const TodoDashboardPage = () => {
    return (
        <>
            <div className="TodoDashboardPage">
                <div 
                    className="TodoDashboardPage__arrow-container">
                    <ScrollLeft />
                    <Today />
                </div>
                <TodoByDate />
                <div 
                    className="TodoDashboardPage__arrow-container TodoDashboardPage__arrow-container--right">
                    <ScrollRight />
                </div>
            </div>

        </>
    )
}

export default TodoDashboardPage;