import { getFullName, getYearsOfStudy, getFaculty, getBirthDate } from './students.js';

const tbody = document.querySelector('.tbody');

const refreshList = function () {
  document.querySelectorAll('.listItem').forEach((el) => {
    el.remove();
  });
};

const refreshForm = function () {
  document.querySelectorAll('#form input').forEach((el) => {
    el.value = '';
  });
};

const createStartListItem = function () {
  const startTr = document.createElement('tr');
  const startTd = document.createElement('td');
  const colsAmount = document.querySelector('.table').rows[0].children.length;

  startTd.setAttribute('colspan', colsAmount);
  startTd.classList.add('table__tr-start');
  startTd.textContent = 'Здесь пока пусто';

  startTr.append(startTd);
  tbody.append(startTr);
};

const createListItem = function (student) {
  const newTr = document.createElement('tr');
  const fullName = document.createElement('td');
  const yearsOfStudy = document.createElement('td');
  const faculty = document.createElement('td');
  const birthDate = document.createElement('td');
  const deleteWrap = document.createElement('td');
  const deleteBtn = document.createElement('button');

  newTr.classList.add('listItem');
  deleteBtn.classList.add('btn', 'btn-danger', 'js-delete-list-item');

  fullName.textContent = getFullName(student);
  yearsOfStudy.textContent = getYearsOfStudy(student);
  faculty.textContent = getFaculty(student);
  birthDate.textContent = getBirthDate(student);
  deleteBtn.textContent = 'Удалить';

  deleteBtn.setAttribute('data-delete-id', `${student.id}`);

  deleteWrap.append(deleteBtn);
  newTr.append(fullName, faculty, birthDate, yearsOfStudy, deleteWrap);
  return newTr;
};

const addList = function (list) {
  list.forEach((item) => {
    tbody.append(createListItem(item));
  });
};

const setFormAttr = function () {
  const dateOfBirth = document.querySelector('[name="date_of_birth"]');
  const startOfStudy = document.querySelector('[name="start_of_study"]');

  dateOfBirth.onfocus = () => {
    dateOfBirth.type = 'date';
    dateOfBirth.min = '1900-01-01';
    dateOfBirth.max = new Date().toISOString().split('T')[0];
  };

  // dateOfBirth.onblur = () => {
  //   dateOfBirth.type = 'text';
  // };

  startOfStudy.min = '2000';
  startOfStudy.max = new Date().getFullYear();
};

const validation = function () {
  const removeErrorMessage = function (input) {
    const wrapper = input.parentNode;
    if (wrapper.classList.contains('error')) {
      wrapper.querySelector('.error-label').remove();
      wrapper.classList.remove('error');
      input.classList.remove('invalid');
    }
  };

  const errorMessage = function (input, text) {
    const wrapper = input.parentNode;
    const errorLabel = document.createElement('label');

    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;

    wrapper.classList.add('error');
    input.classList.add('invalid');
    wrapper.append(errorLabel);
  };

  let result = true;

  const inputs = document.querySelectorAll('#form input');

  inputs.forEach((input) => {
    removeErrorMessage(input);

    if (input.value.trim() === '') {
      removeErrorMessage(input);
      errorMessage(input, 'Заполните поле!');
      input.value = '';
      result = false;
    }

    if (input.value.trim() !== '' && input.name === 'date_of_birth') {
      if (input.value.trim() < input.min) {
        removeErrorMessage(input);
        errorMessage(input, 'Значение не может быть меньше 01.01.1900');
        result = false;
      }
      if (input.value.trim() > input.max) {
        const now = new Date();
        const yyyy = now.getFullYear();
        let mm = now.getMonth() + 1;
        let dd = now.getDate();

        mm < 10 ? mm = '0' + mm : mm;
        dd < 10 ? dd = '0' + dd : dd;

        const today = `${dd}.${mm}.${yyyy}`;
        removeErrorMessage(input);
        errorMessage(input, `Значение не может быть больше ${today}`);
        result = false;
      }
    }

    if (input.value.trim() !== '' && input.name === 'start_of_study') {
      if (input.value.trim() < 2000) {
        removeErrorMessage(input);
        errorMessage(input, 'Значение не может быть меньше 2000-го года');
        result = false;
      }

      if (input.value.trim() > 2023) {
        removeErrorMessage(input);
        errorMessage(input, 'Значение не может быть больше текущего года');
        result = false;
      }
    }
  });
  return result;
};

async function addNewListItem() {
  const name = document.querySelector('[name="name"]');
  const lastname = document.querySelector('[name="lastname"]');
  const surname = document.querySelector('[name="surname"]');
  const dateOfBirth = document.querySelector('[name="date_of_birth"]');
  const startOfStudy = document.querySelector('[name="start_of_study"]');
  const faculty = document.querySelector('[name="faculty"]');

  const correctName = name.value[0].toUpperCase() + name.value.slice(1);
  const correctLastname = lastname.value[0].toUpperCase() + lastname.value.slice(1);
  const correctSurname = surname.value[0].toUpperCase() + surname.value.slice(1);
  const correctFaculty = faculty.value[0].toUpperCase() + faculty.value.slice(1);

  await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: correctName,
      // * обязательное поле, фамилия студента
      surname: correctSurname,
      // * обязательное поле, отчество студента
      lastname: correctLastname,
      // * обязательное поле, дата рождения студента
      birthday: dateOfBirth.valueAsDate,
      // * обязательное поле, год начала обучения студента
      studyStart: startOfStudy.value,
      // * обязательное поле, факультет
      faculty: correctFaculty,
    }),
  });
  refreshForm();
}

async function deleteDataItem(id) {
  await fetch(`http://localhost:3000/api/students/${id}`, {
    method: 'DELETE',
  });
}

const deleteListItem = () => {
  document.querySelectorAll('.js-delete-list-item').forEach((btn) => {
    btn.addEventListener('click', function () {
      deleteDataItem(this.getAttribute('data-delete-id'));
    });
  });
};

const sortByProp = function (prop) {
  return ((a, b) => (a[prop] > b[prop] ? 1 : -1));
};

const sorting = function (arr, prop, isClick) {
  if (isClick) {
    arr.sort(sortByProp(prop));
  } else {
    arr.sort(sortByProp(prop)).reverse();
  }
  refreshList();
  addList(arr);
  deleteListItem();
};

const listFilter = function (list, key, id) {
  const getSubstr = (list) => list[`${key}`].toLowerCase().includes(document.getElementById(`${id}`).value.toLowerCase());
  const filtredList = list.filter(getSubstr);
  refreshList();
  addList(filtredList);
  deleteListItem();
};

const fullNameFilter = function (list, id) {
  const filtredList = list.filter((student) => {
    const fullName = getFullName(student);
    return fullName.toLowerCase().includes(document.getElementById(`${id}`).value.toLowerCase());
  });
  refreshList();
  addList(filtredList);
  deleteListItem();
};

const endOfStudyFilter = function (list, key, id) {
  const getSubstr = (list) => {
    const endOfStudy = (Number(list[`${key}`]) + 4).toString();
    return endOfStudy.toLowerCase().includes(document.getElementById(`${id}`).value.toLowerCase());
  };
  const filtredList = list.filter(getSubstr);
  refreshList();
  addList(filtredList);
  deleteListItem();
};

document.addEventListener('DOMContentLoaded', async () => {
  setFormAttr();
  const response = await fetch('http://localhost:3000/api/students');
  const data = await response.json();
  if (data.length > 0) {
    console.log(data);
    addList(data);
  } else {
    createStartListItem();
  }

  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (validation(this) === true) {
      refreshList();
      addNewListItem();
    }
  });

  // sorting

  let sortFlag = true;

  document.getElementById('fullNameTitle').addEventListener('click', () => {
    sortFlag = !sortFlag;
    sorting(data, 'surname', sortFlag);
  });
  document.getElementById('facultyTitle').addEventListener('click', () => {
    sortFlag = !sortFlag;
    sorting(data, 'faculty', sortFlag);
  });
  document.getElementById('dateOfBirthTitle').addEventListener('click', () => {
    sortFlag = !sortFlag;
    sorting(data, 'birthday', sortFlag);
  });
  document.getElementById('startOfStudyTitle').addEventListener('click', () => {
    sortFlag = !sortFlag;
    sorting(data, 'studyStart', sortFlag);
  });

  // filtration

  document.getElementById('searchByFullName').addEventListener('input', () => {
    fullNameFilter(data, 'searchByFullName');
  });

  document.getElementById('searchByFaculty').addEventListener('input', () => {
    listFilter(data, 'faculty', 'searchByFaculty');
  });

  document.getElementById('searchByStart').addEventListener('input', () => {
    listFilter(data, 'studyStart', 'searchByStart');
  });

  document.getElementById('searchByEnd').addEventListener('input', () => {
    endOfStudyFilter(data, 'studyStart', 'searchByEnd');
  });

  // delete

  deleteListItem();
});
