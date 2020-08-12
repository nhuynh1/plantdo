import database from './firebase';

const setTodos = (user) => {
    const todos = [];
    return database.ref(`todos/${user}`)
        .once('value')
        .then(snapshot => {
            snapshot.forEach(todo => {
                todos.push({ ...todo.val(), id: todo.key })
            })
            return todos;
        })
}

const createTodo = (todo, user) => {
    return database.ref(`todos/${user}`).push(todo)
}

const completeTodo = (id, user, isComplete) => {
    return database.ref(`todos/${user}/${id}`)
        .update({ isComplete })
}

const updateTodo = (id, user, task) => {
    return database.ref(`todos/${user}/${id}`)
        .update({ task })
}

const removeTodo = (id, user) => {
    return database.ref(`todos/${user}/${id}`).remove()
}

const migrateTodo = (id, user, dateActive) => {
    return database.ref(`todos/${user}/${id}`)
        .update({ dateActive })
}

export { createTodo, completeTodo, migrateTodo, removeTodo, setTodos, updateTodo };