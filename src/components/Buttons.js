import React, { useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import AuthContext from '../contexts/auth-context';
import { migrateTodo, removeTodo, login as _login } from '../firebase/actions';

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
    const login = () => {
        _login();
    }
    return (
        <button
            className="Button--login"
            onClick={login}
            type="button">
            Login with Google
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
    const { setMaxShowing } = useContext(AppContext);
    return (
        <button
            aria-label="View Today"
            className="Button Button--today"
            type="button"
            onClick={() => setMaxShowing({ start: 0, end: 3 })}
        ></button>
    )
}

const ScrollRight = () => {
    const { maxShowing, setMaxShowing } = useContext(AppContext);

    const handleScrollRight = (e) => {
        e.preventDefault();
        // if (maxShowing.end === loaded) {
        //     setLoaded(loaded + 3);
        //     setMaxShowing({ start: maxShowing.end, end: maxShowing.end + 3 });
        // } else {
        setMaxShowing({ start: maxShowing.end, end: maxShowing.end + 3 });
        // }
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
    const { maxShowing, setMaxShowing } = useContext(AppContext);
    const handleScrollLeft = (e) => {
        e.preventDefault();
        setMaxShowing({ start: maxShowing.start - 3, end: maxShowing.start });
    }

    return (
        <button
            aria-label="Previous 3 days"
            className="Button Button--left"
            type="button"
            onClick={handleScrollLeft}
            disabled={maxShowing.start === 0}>
        </button>
    )
}

export { Delete, Migrate, ScrollLeft, ScrollRight, Today, Login };