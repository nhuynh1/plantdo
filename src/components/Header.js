import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { firebase } from '../firebase/firebase';
import AuthContext from '../contexts/auth-context';
import AboutPage from './AboutPage';
import logo from '../svgs/cactus.svg';
import '../styles/Header.css';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay = {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}
Modal.defaultStyles.content = {
    alignItems: 'flex-end',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    overflow: 'auto',
    padding: '0.5rem 2rem 1rem 2rem',
    WebkitOverflowScrolling: 'touch',
    width: '80%'
}

const Header = () => {
    const [infoIsOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext)

    const closeModal = () => {
        setIsOpen(false);
    }

    const logout = () => {
        firebase.auth().signOut();
    }

    return (
        <>
            <header className="Header">
                <div className="Header__brand">
                    <img className="Header__logo" src={logo} alt="Plant-Do logo" />
                    <h1 className="Header__title">Plant-Do</h1>
                </div>
                {isAuthenticated && (<div className="Header__button-group">
                    <button
                        aria-label="About Plant-Do"
                        className="Header__button Header__button--info"
                        title="About Plant-Do"
                        type="button"
                        onClick={() => setIsOpen(!infoIsOpen)}>
                    </button>
                    <button
                        className="Header__button Header__button--link"
                        onClick={logout}
                        type="button">
                        Logout
                    </button>
                </div>)}
            </header>
            <Modal
                isOpen={infoIsOpen}
                onRequestClose={closeModal}>
                <button
                    aria-label="Close"
                    className="Header__button Header__button--close"
                    type="button"
                    onClick={closeModal}>
                </button>
                <AboutPage />
            </Modal>
        </>
    )
}

export default Header;