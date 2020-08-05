import React, { useEffect, useState } from 'react'
import logo from '../svgs/cactus.svg';

import '../styles/Plant.css';

const randomPosition = (limit) => {
    return `${Math.floor(Math.random() * limit) + 1}%`;
}

const Plant = () => {
    const [position, setPosition] = useState({left: '0%', bottom: '0%'});
    
    useEffect(() => {
        setPosition( {left: randomPosition(80), bottom: randomPosition(35)} );
    },[]);
    
    return (
        <span className="Flower" style={position}><img src={logo} alt="" /></span>
    )
}

export default Plant;