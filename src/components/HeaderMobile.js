import React, { useContext } from 'react';
import AuthContext from '../contexts/auth-context';
import { Today as TodayButton, User as UserButton } from './Buttons';
import logo from '../svgs/cactus.svg';

import '../styles/HeaderMobile.css';

const HeaderMobile = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="HeaderMobile">
            {isAuthenticated ? (
                <>
                    <TodayButton />
                    <UserButton />
                </>
            ) : (
                <div className="HeaderMobile__brand">
                    <img className="Header__logo" src={logo} alt="Plant-Do logo" />
                    <h1 className="Header__title">Plant-Do</h1>
                </div>
            )}
        </div>
    );
}

export default HeaderMobile;