import { Loader } from './modules/loader/_Loader.js';
import { Modal } from './modules/modal/_Modal.js';
import { userListUpdate } from './api/_updateUsers.js';
import { createUserList } from './modules/userList/_userListRender.js';
import { getUser } from './api/_getUser.js';
import { searchUsers } from './api/_searchUsers.js';
import { sorting } from './modules/functions/_sorting.js';
import { tinyLoader } from './modules/_iconSprite.js';


const tableEl = document.querySelector('#table');
const tableWrapper = document.querySelector('.userboard__wrap');
export const tBodyEl = tableEl.querySelector('tBody');

export function render(state, container) {
  container.innerHTML = '';
  const { users, renderProcess } = state;

  if (renderProcess.state === 'loading' || 'failed') {
    container.append(Loader());
  }

  if (renderProcess.state === 'rendering') {
    container.innerHTML = '';
    tableWrapper.classList.remove('d-flex');
    createUserList(users, container);

    setupUserActionButtons('[data-action="edit"]', 'edit');
    setupUserActionButtons('[data-action="delete"]', 'delete');

    const moreContactsBtns = document.querySelectorAll('.more-contacts');
    if (moreContactsBtns) {
      moreContactsBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const parent = e.currentTarget.closest('.userboard__contacts');
          parent.classList.toggle('over-5');
          btn.remove();
        });
      })

    }
  }
}

function setupUserActionButtons(selector, action) {
  const userButtons = document.querySelectorAll(selector);
  userButtons.forEach((btn) => {
    const newHandler = async (e) => {
      const curBtn = e.currentTarget;
      const curBtnIcon = curBtn.querySelector('svg') || null;
      const iconViewBox = curBtnIcon.getAttribute('viewBox');
      const newiconViewBox = '0 0 16 16';
      let editIcon;


      if (curBtnIcon) {
        editIcon = curBtnIcon.innerHTML;
        curBtnIcon.innerHTML = tinyLoader;
        curBtnIcon.classList.add('animated-rotate');
        curBtnIcon.setAttribute('viewBox', newiconViewBox);
      }

      const userId = curBtn.dataset.userId;
      const user = action !== 'add' ? await getUser(userId) : null;

      setTimeout(() => {
        if (curBtnIcon) {
          curBtnIcon.classList.remove('animated-rotate');
          curBtnIcon.innerHTML = editIcon;
          curBtnIcon.setAttribute('viewBox', iconViewBox);
        }

        showModal(state, action, user);
      }, 600)
    };

    btn.addEventListener('click', newHandler);
  });
}

export function showModal(state, modalType, user = null) {
  // console.log('showModal')
  state.modal = Modal(state, modalType, user);
  document.body.append(state.modal);
  state.modal.classList.add('active');
}


const state = {
  users: [],
  renderProcess: {
    state: 'loading',
  },
  sortProcess: {
    direction: 'asc',
  },
  modal: null,
};

async function runApp() {
  const searchForm = document.querySelector('#search-form');
  const sortById = document.querySelector('[data-click="sorting-id"]');
  const sortByName = document.querySelector('[data-click="sorting-surname"]');
  const sortByCreatedAt = document.querySelector(
    '[data-click="sorting-createdAt"]'
  );
  const sortByUpdatedAt = document.querySelector(
    '[data-click="sorting-updatedAt"]'
  );

  function renderSortedData(e) {
    const [, propForSorting] = e.currentTarget.dataset.click.split('sorting-');
    const arrowEl = e.currentTarget.querySelector('.arrow');
    const allArrows = document.querySelectorAll('.arrow');

    allArrows.forEach(item => {
      const parent = item.closest('.userboard__table-btn');
      parent.classList.remove('was-sorted');
      item.classList.remove('direction');
    });

    const isAscending = state.sortProcess.direction === 'asc';

    state.sortProcess.direction = isAscending ? 'desc' : 'asc';

    arrowEl.classList.toggle('direction', !isAscending);
    e.currentTarget.classList.add('was-sorted');

    state.users = isAscending
      ? sorting(state.users, propForSorting).reverse()
      : sorting(state.users, propForSorting);

    render(state, tBodyEl);
  }

  function filterContact(state, form) {
    const searchField = form.querySelector('input');
    const timerDelay = 300;
    let timerId;

    const inputHandler = (e) => {
      const searchStr = e.target.value;

      clearTimeout(timerId);
      timerId = setTimeout(async () => {
        state.users = await searchUsers(searchStr);
        render(state, tBodyEl);
      }, timerDelay);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    searchField.addEventListener('input', inputHandler);

  }


  sortById.addEventListener('click', renderSortedData);
  sortByName.addEventListener('click', renderSortedData);
  sortByCreatedAt.addEventListener('click', renderSortedData);
  sortByUpdatedAt.addEventListener('click', renderSortedData);
  filterContact(state, searchForm);


  render(state, tBodyEl);
  await userListUpdate(state, tBodyEl);
  setupUserActionButtons('[data-action="add"]', 'add');
}

runApp();

export { state }