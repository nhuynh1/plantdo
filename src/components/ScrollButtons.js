import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import TodosContext from '../contexts/todos-context';
import DaysLoadedContext from '../contexts/days-loaded-context';

const ScrollButtons = () => {
    const { todosDispatch } = useContext(TodosContext);
    const { loaded, setLoaded } = useContext(DaysLoadedContext);
    const [maxShowing, setMaxShowing] = useState(3);

    const scrollTo = (panes = 1) => {
        const viewportWidth = window.innerWidth;
        const scrollOptions = {
            top: 0,
            left: viewportWidth * (panes - 1),
            behavior: "smooth"
        }
        window.scrollTo(scrollOptions);
    }

    useEffect(() => {
        scrollTo(maxShowing / 3);
    }, [maxShowing]);

    useEffect(() => {
        console.log('dispatch');
        todosDispatch({
            type: 'ADD_TODO_TEST',
            todo: 'blah blah blah',
            dateAdded: moment().subtract(loaded - 1, 'days')
        })
    }, [loaded, todosDispatch]);

    const handleScrollRight = (e) => {
        e.preventDefault();
        if (maxShowing === loaded) {
            setLoaded(loaded + 3);
            setMaxShowing(maxShowing + 3);
        } else {
            setMaxShowing(maxShowing + 3);
        }
    }

    const handleScrollLeft = (e) => {
        e.preventDefault();
        setMaxShowing(maxShowing - 3);   
    }

    return (
        <div>
            <button
            type="button"
                // style={{ position: "fixed", right: "70px" }}
                onClick={handleScrollLeft}
                disabled={maxShowing <= 3}>
                left
            </button>
            <button
            type="button"
                // style={{ position: "fixed", right: "0px" }}
                onClick={handleScrollRight}>
                right
            </button>
        </div>
    )
}

export default ScrollButtons;