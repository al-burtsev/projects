import { ModalCloseBtn } from './_ModalCloseBtn.js';
import { createContact } from './contacts/_createContact.js';
import { plusIcon } from '../_iconSprite.js';
import { initAddMode } from './_initAddMode.js';
import { initEditMode } from './_initEditMode.js';
import { initDeleteMode } from './_initDeleteMode.js';
import { hideModal } from './_hideModal.js';
import { showModal } from '../../main.js';
import { setMask } from '../functions/_setMask.js'

const closeBtn = ModalCloseBtn();

export function Modal(state, ...settings) {

  const [modalType, userData] = settings;

  const formFields = [
    {
      field: 'Фамилия',
      required: true,
      fieldName: 'surname',
      id: 'surname',
    },
    {
      field: 'Имя',
      required: true,
      fieldName: 'name',
      id: 'name',
    },
    {
      field: 'Отчество',
      required: false,
      fieldName: 'lastName',
      id: 'lastName',
    },
  ];

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalWrap = document.createElement('div');
  modalWrap.classList.add('modal__wrap');

  const modalTitle = document.createElement('h3');
  modalTitle.textContent = 'Новый клиент';
  modalTitle.classList.add('modal__title');

  const modalForm = document.createElement('form');
  modalForm.setAttribute('novalidate', 'novalidate');
  modalForm.classList.add('modal__form');
  modalForm.id = 'user-form';

  const btnWrap = document.createElement('div');
  btnWrap.classList.add('modal__wrap-btn');

  const contactsElem = document.createElement('div');
  contactsElem.id = 'contacts';
  contactsElem.classList.add('modal__contacts');

  const contactsWrapElem = document.createElement('div');
  contactsWrapElem.id = 'contacts-wrap';
  contactsWrapElem.classList.add('modal__contacts-wrap', 'contact-list');

  const addContactBtn = document.createElement('button');
  addContactBtn.type = 'button';
  addContactBtn.classList.add('btn-reset', 'add-contact', 'modal__contact-btn');
  addContactBtn.innerHTML = `${plusIcon} Добавить контакт`;

  const modalSubmitBtn = document.createElement('button');
  modalSubmitBtn.classList.add('btn-reset', 'btn-primary', 'modal__submit-btn');
  modalSubmitBtn.type = 'submit';
  modalSubmitBtn.textContent = 'Сохранить';


  const modalActionBtn = document.createElement('button');
  modalActionBtn.classList.add('btn-reset', 'close-btn', 'modal__abort-btn');
  modalActionBtn.type = 'button';
  modalActionBtn.textContent = 'Отмена';

  formFields.forEach(
    ({ field: fieldTitle, required: isRequired, fieldName, id }) => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'field-wrapper';

      const labelName = document.createElement('label');
      labelName.setAttribute('for', `${fieldName}`);

      if (isRequired) {
        labelName.innerHTML = `${fieldTitle}<span class="required">*</span>`;
      } else {
        labelName.textContent = fieldTitle;
      }

      const inputName = document.createElement('input');
      inputName.type = 'text';
      inputName.id = `${id}`;
      inputName.name = `${fieldName}`;
      inputName.required = isRequired;


      if (inputName.value !== '') {
        labelName.classList.add('moved');
      }

      inputName.addEventListener('focus', () => {
        labelName.classList.add('moved');
      });

      inputName.addEventListener('blur', () => {
        if (inputName.value === '') {
          labelName.classList.remove('moved');
        }
      })

      setMask(inputName, {
        'mask': "a{3,20}",
        "placeholder": "",
      });

      fieldWrapper.append(labelName, inputName);
      modalForm.append(fieldWrapper);
    }
  );

  btnWrap.append(modalSubmitBtn, modalActionBtn);
  contactsElem.append(contactsWrapElem, addContactBtn);
  modalForm.append(contactsElem, btnWrap);
  modalWrap.append(closeBtn, modalTitle, modalForm);
  modal.append(modalWrap);

  if (modalType === "add") {
    initAddMode(modalTitle, modalForm, modalSubmitBtn);

    addContactBtn.addEventListener('click', () => {
      contactsWrapElem.append(createContact());
      contactsElem.classList.add('showed');
      if (contactsWrapElem.children.length >= 10) {
        addContactBtn.classList.add('hidden');
      }
    });

    modalActionBtn.addEventListener('click', () => {
      hideModal(modal, 600)
    });
  }

  if (modalType === "edit") {
    modalActionBtn.textContent = 'Удалить клиента';
    initEditMode(modalTitle, modalForm, userData, modalSubmitBtn);

    const { contacts } = userData;

    const filledContacts = contacts.map((contact) => {
      const contactEl = createContact(contact.type);
      const select = contactEl.querySelector('[data-contact="type"]');
      const input = contactEl.querySelector('[data-contact="value"]');
      const delBtn = input.nextElementSibling;

      delBtn.classList.add('visible');

      input.value = contact.value;
      select.value = contact.type;

      return contactEl;
    });

    if (filledContacts.length > 0) {
      contactsWrapElem.prepend(...filledContacts);
      contactsElem.classList.add('showed');
      if (contactsWrapElem.children.length >= 10) {
        addContactBtn.classList.add('hidden');
      }
    }

    addContactBtn.addEventListener('click', () => {
      contactsWrapElem.append(createContact());
      contactsElem.classList.add('showed');

      if (contactsWrapElem.children.length >= 10) {
        addContactBtn.classList.add('hidden');
      }

    });

    modalActionBtn.addEventListener('click', () => {
      showModal(state, 'delete', userData);
      hideModal(modal, 600);
    });
  }

  if (modalType === "delete") {
    contactsElem.remove();
    const descr = document.createElement('p');
    descr.classList.add('delete-descr')
    descr.textContent = "Вы действительно хотите удалить данного клиента?"
    modalForm.prepend(descr)
    initDeleteMode(modalTitle, modalForm, userData, modalSubmitBtn);

    modalActionBtn.addEventListener('click', () => {
      hideModal(modal, 600);
    });
  }

  closeBtn.addEventListener('click', () => {
    hideModal(modal, 600)
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal(modal, 600)
    }
  });
  
  return modal;
}
