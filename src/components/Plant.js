import React, { useEffect, useState } from 'react'
import logo from '../svgs/cactus.svg';
import {randomPosition} from '../helpers/helpers';
import '../styles/Plant.css';

const Plant = () => {
    const [position, setPosition] = useState({});

    useEffect(() => {
        setPosition(randomPosition(80, 17));
    }, []);

    return (
        <span className="Flower" style={position}><img src={logo} alt="" /></span>
    )
}

export default Plant;