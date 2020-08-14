import React, { useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import AuthContext from '../contexts/auth-context';
import { migrateTodo, removeTodo, login , logout } from '../firebase/actions';

import '../styles/Buttons.css';

const Delete = ({ todo }) => {
    const { todosDispatch } = useContext(AppContext);
    const { user } = useContext(AuthContext);

    const onDelete = (id) => () => {
        removeTodo(id, user)
            .then(() => {
                todosDispatch({
                    type: 'DELETE_TODO',
                    id
                });
            })
            .catch(error => console.log(error));
    }

    return (
        <button
            aria-label={`Delete ${todo.task}`}
            className="Button Button--delete"
            type="button"
            onClick={onDelete(todo.id)}>
        </button>
    )
}

const Login = () => {
    // const login = () => {
    //     _login();
    // }
    return (
        <button
            className="Button--login"
            onClick={login}
            type="button">
            Login with Google
        </button>
    )
}

const Logout = () => {
    return (
        <button
            className="Header__button Header__button--link"
            onClick={logout}
            type="button">
            Logout
        </button>
    )
}

const Migrate = ({ todo }) => {
    const { todosDispatch } = useContext(AppContext);
    const { user } = useContext(AuthContext);

    const onMigrate = (id) => () => {
        const dateActive = moment().valueOf();
        migrateTodo(id, user, dateActive)
            .then(() => {
                todosDispatch({
                    type: 'UPDATE_TODO',
                    id,
                    todo: { dateActive }
                });
            })
            .catch(error => console.log(error));
    }

    return (
        <button
            aria-label={`Migrate ${todo.task} to today`}
            className="Button Button--migrate"
            onClick={onMigrate(todo.id)}>
        </button>
    )
}

const Today = () => {
    const { setStartDay } = useContext(AppContext);
    return (
        <button
            aria-label="View Today"
            className="Button Button--today"
            type="button"
            onClick={() => setStartDay(0)}
        ></button>
    )
}

const ScrollRight = () => {
    const { startDay, setStartDay, numDays } = useContext(AppContext);

    const handleScrollRight = (e) => {
        e.preventDefault();
        setStartDay(startDay + numDays);
    }

    return (
        <button
            aria-label="Next 3 days"
            className="Button Button--right"
            type="button"
            onClick={handleScrollRight}>
        </button>
    )
}

const ScrollLeft = () => {
    const { startDay, setStartDay, numDays } = useContext(AppContext);
    const handleScrollLeft = (e) => {
        e.preventDefault();
        setStartDay(startDay - numDays);
    }

    return (
        <button
            aria-label="Previous 3 days"
            className="Button Button--left"
            type="button"
            onClick={handleScrollLeft}
            disabled={startDay === 0}>
        </button>
    )
}

export { Delete, Migrate, ScrollLeft, ScrollRight, Today, Login, Logout };