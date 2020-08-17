import React, { useContext, useState, useRef, useEffect } from 'react';
import AuthContext from '../contexts/auth-context';
import { Logout as LogoutButton, Today as TodayButton } from './Buttons';
import logo from '../svgs/cactus.svg';

import '../styles/HeaderMobile.css';

const UserMenu = () => {
    return (
        <div style={{position: 'absolute',top: 20, right: 5, zIndex: 2, background: 'white', width: '30%'}}>
            <LogoutButton />
        </div>
    )
}

const HeaderMobile = () => {
    const { isAuthenticated } = useContext(AuthContext);
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
        <div className="HeaderMobile" style={{position: 'relative'}}>
            {isAuthenticated ? (
                <>
                    <TodayButton />
                    <div ref={button}>
                        <button className="Button" onClick={() => setMenuOpen(!menuOpen)}>:</button>
                        {menuOpen && <UserMenu />}
                    </div>
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