import React, { useContext } from 'react';
import TodoByDate from './TodoByDate';
import { Today, ScrollLeft, ScrollRight } from './Buttons';
import '../styles/TodoDashboardPage.css'
import AppContext from '../contexts/app-context';
import Loading from './Loading';

const TodoDashboardPage = () => {
    const { isLoading, numDays } = useContext(AppContext);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="TodoDashboardPage">
                {numDays > 1 && (
                    <div
                        className="TodoDashboardPage__arrow-container">
                        <ScrollLeft color={'#77B255'} />
                        <Today />
                    </div>
                )}
                <TodoByDate />
                {numDays > 1 && (
                    <div
                        className="TodoDashboardPage__arrow-container TodoDashboardPage__arrow-container--right">
                        <ScrollRight color={'#77B255'} />
                    </div>
                )}
            </div>

        </>
    )
}

export default TodoDashboardPage;