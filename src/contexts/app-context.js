import React, { useReducer, useState } from 'react';
import useViewport from '../hooks/useViewport';
import todosReducer from '../reducers/todos';
import { numDaysByViewportWidth } from '../helpers/helpers';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const { width } = useViewport();
    const [todos, todosDispatch] = useReducer(todosReducer, []);
    const [isLoading, setIsLoading] = useState(true);
    const [numDays, setNumDays] = useState(numDaysByViewportWidth(width));
    const [startDay, setStartDay] = useState(0);

    return (
        <AppContext.Provider
            value={{
                todos,
                todosDispatch,
                isLoading,
                setIsLoading,
                numDays,
                setNumDays,
                startDay,
                setStartDay,
                width
            }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider , AppContext as default };