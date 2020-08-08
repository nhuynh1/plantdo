import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const todosReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO_TEST':
            return [
                ...state, 
                    { 
                        task: action.todo, 
                        isComplete: false, 
                        dateAdded: action.dateAdded.valueOf(),
                        dateActive: action.dateAdded.valueOf(),
                        id:  uuidv4()
                    }
                ];
        case 'ADD_TODO':
            return [
                ...state, 
                    { 
                        task: action.todo, 
                        isComplete: false, 
                        dateAdded: moment().valueOf(),
                        dateActive: moment().valueOf(),
                        id:  uuidv4() 
                    }
                ];
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