const todosReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            console.log(action.todo);
            return [...state, action.todo];
        case 'COMPLETE_TODO':
            return state.map(todo => {
                if(todo.id === action.id) {
                    return {
                        ...todo,
                        isComplete: action.isComplete
                    };
                } else {
                    return todo;
                }
            });
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'SET_TODOS':
            return action.todos;
        case 'UPDATE_TODO':
            return state.map(todo => {
                if(todo.id === action.id){
                    return {
                        ...todo,
                        ...action.todo
                    };
                } else {
                    return todo;
                }
            })
        default:
            return state;
    }
}

export default todosReducer;