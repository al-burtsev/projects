
export function getTodoList(owner) {
  let localData = JSON.parse(localStorage.getItem(owner));
  return localData !== null ? localData : [];
}

function saveList(keyName, arr) {
  localStorage.setItem(keyName, JSON.stringify(arr));
}

export function createTodoItem({ owner, name }) {
  let localData = [];
  if (
    localStorage.getItem(owner) === null ||
    localStorage.getItem(owner) === ''
  ) {
    localData = [];
  } else {
    localData = JSON.parse(localStorage.getItem(owner));
  }

  const createId = () => Date.now().toString();

  const item = {
    name,
    done: false,
    id: createId(),
  };

  localData.push(item);
  saveList(owner, localData);
  console.log(localData);
  return item;
}

export function switchTodoItemDone({ todoItem, owner }) {
  const localData = getTodoList(owner);
  console.log(localData)
  console.log(owner)
  for (let i = 0; i < localData.length; i++) {
    if (localData[i].id === todoItem.id) {
      localData[i].done = !localData[i].done;
      todoItem.done = !todoItem.done;
    }
  }

  saveList(owner, localData);
}

export function deleteTodoItem({ element, todoItem, owner }) {
  const localData = getTodoList(owner);

  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove();

  for (let i = 0; i < localData.length; i++) {
    if (localData[i].id == todoItem.id) {
      localData.splice(i, 1);
    }
  }

  saveList(owner, localData);
}
