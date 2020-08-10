import database from './firebase';

const setTodos = () => {
    const todos = [];
    return database.ref('todos')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(todo => {
                todos.push({ ...todo.val(), id: todo.key })
            })
            return todos;
        })
}

const completeTodo = (id, isComplete) => {
    return database.ref(`todos/${id}`)
        .update({ isComplete })
}

const updateTodo = (id, task) => {
    return database.ref(`todos/${id}`)
        .update({ task })
}

export { setTodos, completeTodo, updateTodo };