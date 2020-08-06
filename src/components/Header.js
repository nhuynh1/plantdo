import React from 'react';

import ScrollButtons from './ScrollButtons';

import logo from '../svgs/cactus.svg';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="Header">
            <div className="Header__brand">
                <img className="Header__logo" src={logo} alt="Plant-Do logo" />
                <h1 className="Header__title">Plant-Do</h1>
            </div>
            <div>
                <ScrollButtons />
            </div>
        </header>
    )
}

export default Header;