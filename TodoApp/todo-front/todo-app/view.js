function createSwitcher() {
  const app = document.getElementById('todo-app');
  const switcherContainer = document.createElement('div');
  const switcher = document.createElement('button');
  switcherContainer.classList.add('container', 'mb-5');
  switcher.id = 'storageSwitcher';
  switcher.classList.add('btn', 'btn-primary');
  switcher.textContent = "Перейти на серверное хранилище";
  switcher.dataset.from = 'local';
  switcherContainer.append(switcher);
  document.body.insertBefore(switcherContainer, app);
}
// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}
//создаем и возвращаем форму для создания дела
function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

// создаем и возвращаем список элементов
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElem(todoItem, { onDone, onDelete }, owner) {
  const doneClass = 'list-group-item-success';
  let item = document.createElement('li');
  // кнопки помещаем в элемент, который отобразит их в группе
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  // добавим стили для элемента списка
  // и размещения кнопок в его правой части с помощью flex
  item.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  );
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  // добавляем обработчики на кнопки
  doneButton.addEventListener('click', function () {
    onDone({ todoItem, element: item, owner });
    item.classList.toggle(doneClass, todoItem.done);
  });
  deleteButton.addEventListener('click', function () {
    onDelete({ todoItem, element: item, owner });
  });

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(
  container,
  {
    title,
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
  }
) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);
  console.log(todoItemList);
  todoItemList.forEach((todoItem) => {
    const todoItemElem = createTodoItemElem(todoItem, handlers, owner);
    todoList.append(todoItemElem);
  });

  // браузер создает событие submit на форме по нажатию на Enter ли на кнопку создания дела
  todoItemForm.form.addEventListener('submit', async (e) => {
    // эта строка необходима, чтобы предотвратить стандартное действие браузера
    // в даннм случае не хотим, чтобы страница перезагружалась при отправке формы
    e.preventDefault();

    // игнорируем созданиежлемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    const todoItemElem = createTodoItemElem(todoItem, handlers, owner);

    // создаем и добавляем в список новое дело с названием из поля для ввода
    todoList.append(todoItemElem);

    // обнуляем значение в поле, чтобы не нужно было стирать вручную
    todoItemForm.input.value = '';
  });
}

export { createSwitcher, createTodoApp };
