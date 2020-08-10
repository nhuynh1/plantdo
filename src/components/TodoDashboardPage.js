import React from 'react';

import TodoByDate from './TodoByDate';
import { ScrollLeft, ScrollRight } from './ScrollButtons';

import '../styles/TodoDashboardPage.css'

const TodoDashboardPage = () => {
    return (
        <>
            <div className="TodoDashboardPage">
                <div 
                    className="TodoDashboardPage__arrow-container">
                    <ScrollLeft />
                    today
                </div>
                <TodoByDate />
                <div className="TodoDashboardPage__arrow-container TodoDashboardPage__arrow-container--right"><ScrollRight /></div>
            </div>

        </>
    )
}

export default TodoDashboardPage;