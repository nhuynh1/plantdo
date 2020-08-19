import moment from 'moment';
import todosReducer from '../../reducers/todos';
import todos from '../fixtures/todos';

test('should add todo to state', () => {
    const action = {
        type: 'ADD_TODO',
        todo: todos[0]
    }
    const state = todosReducer([], action);
    expect(state).toEqual([todos[0]]);
});

test('should delete todo from state', () => {
    const id = todos[3].id;
    const action = {
        type: 'DELETE_TODO',
        id
    }
    const state = todosReducer(todos, action);
    expect(state).toEqual(todos.slice(0, -1));
});

test('should set todos to state', () => {
    const action = {
        type: 'SET_TODOS',
        todos
    }
    const state = todosReducer([], action);
    expect(state).toEqual(todos);
});

test('should update todo in the state', () => {
    const updatedTodo = { ...todos[0], task: "updated task" };
    const action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        todo: updatedTodo
    }
    const state = todosReducer(todos, action);
    expect(state).toEqual([updatedTodo, ...todos.slice(1,4)]);
});

test('should update todo isComplete in the state', () => {
    const id = todos[0].id;
    const action = {
        type: 'COMPLETE_TODO',
        id,
        isComplete: true
    }
    const state = todosReducer(todos, action);
    const updatedTodo = { ...todos[0], isComplete: true };
    expect(state).toEqual([updatedTodo, ...todos.slice(1, 4)]);
});

test('should migrate todo to current day', () => {
    const todo = { ...todos[0] };
    const now = moment().valueOf();
    todo.dateActive = now;
    const action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        todo
    }
    const state = todosReducer(todos, action);
    expect(state).toEqual([todo, ...todos.slice(1,4)]);
});