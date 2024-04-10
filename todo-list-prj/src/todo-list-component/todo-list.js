function todoList(project, todoItems = []){
    // Insert default project
    const _project = project;
    let _todoItems = todoItems;

    const addTodo = (todoItem) => {
        _todoItems.push(todoItem);
    }

    const deleteTodo = (todo) => {
        _todoItems = _todoItems.filter(item => item != todo);
    }

    const clearTodoList = () => {
        _todoItems = [];
    }

    const getTodos = () => {
        return _todoItems;
    }

    const getProject = () => {
        return _project;
    }

    return {addTodo, deleteTodo, clearTodoList, getTodos, getProject};
}

export {todoList};
