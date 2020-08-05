import React from 'react';

import logo from '../svgs/cactus.svg';
import '../styles/Header.css';

const Header = () => {

    // useRef: https://reactjs.org/docs/hooks-reference.html#useref
    const scrollTo = () => {
        window.scrollTo({
            top: 0,
            left: 2000,
            behavior: 'smooth'
        })
    }

    return (
        <header className="Header">
            <div className="Header__brand">
                <img className="Header__logo" src={logo} alt="Plant-Do logo" />
                <h1 className="Header__title">Plant-Do</h1>
            </div>
            <div>
                <button
                    style={{ position: "fixed", right: "0px" }}
                    onClick={scrollTo}>
                    right
                </button>
            </div>
        </header>
    )
}

export default Header;