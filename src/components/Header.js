import React, { useState } from 'react';
import Modal from 'react-modal';

import logo from '../svgs/cactus.svg';
import '../styles/Header.css';

Modal.setAppElement('#root')

const Header = () => {
    const [infoIsOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
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
                        type="button"
                        onClick={() => setIsOpen(!infoIsOpen)}>
                    </button>
                </div>
            </header>
            <Modal
                isOpen={infoIsOpen}
                onRequestClose={closeModal}>
                <p>my modal</p>
                <button
                    type="button"
                    onClick={closeModal}
                    >close</button>
            </Modal>
        </>
    )
}

export default Header;