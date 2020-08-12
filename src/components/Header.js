import React, { useState } from 'react';
import Modal from 'react-modal';
import { firebase } from '../firebase/firebase';
import AboutPage from './AboutPage';
import logo from '../svgs/cactus.svg';
import '../styles/Header.css';

Modal.setAppElement('#root')

const Header = () => {
    const [infoIsOpen, setIsOpen] = useState(false);

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
                <div>
                    <button
                        aria-label="About Plant-Do"
                        className="Header__button"
                        title="About Plant-Do"
                        type="button"
                        onClick={() => setIsOpen(!infoIsOpen)}>
                    </button>
                    <button
                        onClick={logout}
                        type="button">
                        Logout
                    </button>
                </div>
            </header>
            <Modal
                isOpen={infoIsOpen}
                onRequestClose={closeModal}>
                <AboutPage />
                <button
                    type="button"
                    onClick={closeModal}
                    >close</button>
            </Modal>
        </>
    )
}

export default Header;