import { editUser } from '../../api/_editUser.js'
import { userListUpdate } from '../../api/_updateUsers.js';
import { state } from '../../main.js'
import { tBodyEl } from '../../main.js';
import { hideModal } from './_hideModal.js';
import { validateForm } from './contacts/_validateForm.js';
import { addTinyLoader } from '../loader/_addTinyLoader.js';
import { errorHandler } from './contacts/_errorHandler.js';

export function initEditMode(modalTitle, modalForm, userData, submitBtn) {
  modalTitle.classList.add('modal-edit')
  modalTitle.innerHTML = `Изменить данные <span class="user-id">ID: ${userData.id.slice(0, 6)}</span>`;
  submitBtn.textContent = "Сохранить";

  const inputs = [...modalForm.elements].filter((elem) => elem.tagName === "INPUT");
  inputs.forEach((input) => {
    input.value = userData[input.id];
    input.previousElementSibling.classList.add('moved');
  });

  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(modalForm)) {
      return false
    };

    const formData = new FormData(modalForm);
    const contactSelects = modalForm.querySelectorAll('[data-contact="type"]');
    const contactInputs = modalForm.querySelectorAll('[data-contact="value"]');
    const jsonData = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    const contactTypes = [...contactSelects].map((elem) => elem.value);
    const contactValues = [...contactInputs].map((elem) => elem.value);

    const contacts = contactTypes.map((contactType, index) => ({
      type: contactType,
      value: contactValues[index],
    }));

    jsonData.contacts = contacts;

    const jsonString = JSON.stringify(jsonData);

    addTinyLoader(submitBtn);

    try {
      await editUser(`http://localhost:3000/api/clients/${userData.id}`, jsonString);
      await userListUpdate(state, tBodyEl);
    } catch (error) {
      errorHandler(submitBtn, error);
      return;
    }

    hideModal(state.modal, 600)
  });
}