import React, { useContext } from 'react';

import DaysLoadedContext from '../contexts/days-loaded-context';
import DaysViewContext from '../contexts/days-view-context';

import '../styles/ScrollButtons.css';

const ScrollRight = () => {
    const { loaded, setLoaded } = useContext(DaysLoadedContext);
    const { maxShowing, setMaxShowing } = useContext(DaysViewContext);

    const handleScrollRight = (e) => {
        e.preventDefault();
        if (maxShowing.end === loaded) {
            setLoaded(loaded + 3);
            setMaxShowing({ start: maxShowing.end, end: maxShowing.end + 3 });
        } else {
            setMaxShowing({ start: maxShowing.end, end: maxShowing.end + 3 });
        }
    }

    return (
        <button
            aria-label="Next 3 days"
            className="ScrollButton ScrollButton--right"
            type="button"
            onClick={handleScrollRight}>
        </button>
    )
}

const ScrollLeft = () => {
    const { maxShowing, setMaxShowing } = useContext(DaysViewContext);
    const handleScrollLeft = (e) => {
        e.preventDefault();
        setMaxShowing({ start: maxShowing.start - 3, end: maxShowing.start });
    }    
    
    return (
        <button
        aria-label="Previous 3 days"
            className="ScrollButton ScrollButton--left"
            type="button"
            onClick={handleScrollLeft}
            disabled={maxShowing.start === 0}>
        </button>
    )
}

const ScrollButtons = () => {
    return (
        <div>
            <ScrollLeft />
            <ScrollRight />
        </div>
    )
}

export {ScrollLeft, ScrollRight, ScrollButtons as default};