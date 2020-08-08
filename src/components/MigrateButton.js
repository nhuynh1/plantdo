import React, { useContext } from 'react'
import moment from 'moment';

import TodosContext from '../contexts/todos-context';

const MigrateButton = ({ todo }) => {
    const { todosDispatch } = useContext(TodosContext);

    const onMigrate = (id) => () => {
        todosDispatch({
            type: 'UPDATE_TODO',
            id,
            todo: {dateActive: moment().valueOf()}
        });
    }
    
    return (
        <button
            aria-label={`Migrate ${todo.task} to today`}
            className="TodoItem__button TodoItem__button--migrate"
            onClick={onMigrate(todo.id)}>
        </button>
    )
}

export default MigrateButton;