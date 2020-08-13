import React, { useEffect, useState } from 'react';
import logo from '../svgs/cactus.svg';
import {randomPosition} from '../helpers/helpers';
import '../styles/LoginPage.css';
import { Login as LoginButton } from './Buttons';

const LoginPage = () => {
    const [position, setPosition] = useState({});

    useEffect(() => {    
        setPosition(randomPosition(80,17));
    }, [])
    
    return (
        <div className="LoginPage">
            <LoginButton />
            <img 
                alt="" 
                className="LoginPage__plant"
                onClick={() => setPosition(randomPosition(80,17))}
                src={logo} 
                style={position} />
        </div>
    )
}

export default LoginPage;