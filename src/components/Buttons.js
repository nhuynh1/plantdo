import React, { useState, useRef, useEffect, useContext } from 'react';
import moment from 'moment';
import AppContext from '../contexts/app-context';
import AuthContext from '../contexts/auth-context';
import { migrateTodo, removeTodo, login, logout } from '../firebase/actions';

import { ReactComponent as DeleteIcon } from '../svgs/delete.svg';
import { ReactComponent as MigrateIcon } from '../svgs/migrate.svg';
import { ReactComponent as RightIcon } from '../svgs/arrow_forward.svg'
import { ReactComponent as LeftIcon } from '../svgs/arrow_back.svg'

import '../styles/Buttons.css';

const Delete = ({ todo, color = '#000000' }) => {
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
            <DeleteIcon fill={color} />
        </button>
    )
}

const Login = () => {
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
            className="Button Button--logout"
            onClick={logout}
            type="button">
            Logout
        </button>
    )
}

const Migrate = ({ todo, color = '#000000' }) => {
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
            <MigrateIcon fill={color} />
        </button>
    )
}

const ProfileIcon = ({ initial = '?' }) => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <style>
                {`.initials {
                    fill: white;
                    font-size: 10px;
                }`}
            </style>
            <circle cx="12" cy="12" r="10" fill="#3E721D" />
            <text textAnchor="middle" x="12" y="15" className="initials">{initial}</text>
        </svg>
    )
}

const ScrollRight = ({ color = '#000000' }) => {
    const { startDay, setStartDay, numDays } = useContext(AppContext);

    const handleScrollRight = (e) => {
        e.preventDefault();
        setStartDay(startDay + numDays);
    }

    return (
        <button
            aria-label={numDays > 1 ? `Next ${numDays} days` : `Next day`}
            className="Button Button--right"
            type="button"
            onClick={handleScrollRight}>
            <RightIcon fill={color} />
        </button>
    )
}

const ScrollLeft = ({ color = '#000000' }) => {
    const { startDay, setStartDay, numDays } = useContext(AppContext);
    const handleScrollLeft = (e) => {
        e.preventDefault();
        setStartDay((startDay - numDays < 1) ? 0 : startDay - numDays);
    }

    return (
        <button
            aria-label={numDays > 1 ? `Previous ${numDays} days` : `Previous day`}
            className="Button Button--left"
            type="button"
            onClick={handleScrollLeft}
            disabled={startDay === 0}>
            <LeftIcon fill={startDay !== 0 ? color : '#CCCCCC'} />
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

const User = () => {
    const { initial } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const button = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(button.current.contains(e.target)) return;
            setMenuOpen(false);
        }
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [])

    return (
        <div ref={button}>
            <button className="Button" onClick={() => setMenuOpen(!menuOpen)}>
                <ProfileIcon initial={initial} />
            </button>
            {menuOpen && <UserMenu />}
        </div>
    )
}

const UserMenu = () => {
    return (
        <div style={{ position: 'absolute', top: 20, right: 5, zIndex: 2, background: 'white', width: '30%' }}>
            <Logout />
        </div>
    )
}

export { Delete, Login, Logout, Migrate, ScrollLeft, ScrollRight, Today, User };