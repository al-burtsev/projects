import { createSwitcher, createTodoApp } from './view.js';

async function loadLocal(title, owner) {
    let local = await import('./localStorage.js');
    const todoItemList = await local.getTodoList(owner);
    const createTodoItem = local.createTodoItem;
    const switchTodoItemDone = local.switchTodoItemDone;
    const deleteTodoItem = local.deleteTodoItem;

    return {
        title,
        owner,
        todoItemList,
        onCreateFormSubmit: createTodoItem,
        onDoneClick: switchTodoItemDone,
        onDeleteClick: deleteTodoItem,
    }
}

async function loadApi(title, owner) {
    let api = await import('./api.js');
    const todoItemList = await api.getTodoList(owner);
    const createTodoItem = api.createTodoItem;
    const switchTodoItemDone = api.switchTodoItemDone;
    const deleteTodoItem = api.deleteTodoItem;

    return {
        title,
        owner,
        todoItemList,
        onCreateFormSubmit: createTodoItem,
        onDoneClick: switchTodoItemDone,
        onDeleteClick: deleteTodoItem,
    }
}

function runApp(title, owner) {
    createSwitcher()
    loadLocal(title, owner).then((value) => {
        createTodoApp(document.getElementById('todo-app'), value);
    });
    document.getElementById('storageSwitcher').addEventListener('click', () => {
        const switcher = document.getElementById('storageSwitcher');
        document.getElementById('todo-app').innerText = '';
        if (switcher.dataset.from === 'local') {
            switcher.dataset.from = 'api';
            switcher.textContent = 'Перейти на локальное хранилище';
            loadApi(title, owner).then((value) => {
                createTodoApp(document.getElementById('todo-app'), value);
            });
        }
        else {
            switcher.dataset.from = 'local';
            switcher.textContent = 'Перейти на серверное хранилище';
            loadLocal(title, owner).then((value) => {
                createTodoApp(document.getElementById('todo-app'), value);
            });
        }
    });
};

export { runApp }