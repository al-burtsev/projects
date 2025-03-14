import { contactDelIcon } from "../../_iconSprite.js";
import { createNewChoices } from "./_createNewChoices.js";
import { createMasks } from "../_createMasks.js";

export function createContact(contactType) {
  const newContact = document.createElement('div');
  const newContactSelect = document.createElement('select');
  const newContactInput = document.createElement('input');
  const newContactAbortBtn = document.createElement('button');

  newContact.dataset.elem = "new-contact";
  newContact.classList.add('contact-item');
  newContactSelect.dataset.contact = "type";
  newContactInput.type = 'text';
  newContactInput.placeholder = 'Введите данные контакта';
  newContactInput.dataset.contact = 'value';
  newContactInput.required = true;
  newContactInput.classList.add('contact-item__input');
  newContactAbortBtn.type = 'button';
  newContactAbortBtn.dataset.tippyContent = "Удалить контакт";
  newContactAbortBtn.innerHTML = `${contactDelIcon}`;
  newContactAbortBtn.classList.add('contact-item__btn');

  newContact.append(newContactSelect, newContactInput, newContactAbortBtn);

  const choice = createNewChoices(newContactSelect);
  if (contactType) {
    choice.setChoiceByValue(contactType);
  }

  choice.passedElement.element.addEventListener(
    'choice',
    function (event) {
      createMasks(newContactInput, event.detail.value)
    },
    false,
  );

  createMasks(newContactInput, choice.passedElement.element.value);

  tippy(newContactAbortBtn, {
    trigger: 'mouseenter click',
    theme: 'custom',
    interactive: true,
    zIndex: 10,
    allowHTML: true,
    touch: 'hold',
  });

  newContactAbortBtn.addEventListener('click', () => {
    const contactsBlock = newContactAbortBtn.closest('#contacts');
    const contactsWrap = newContactAbortBtn.closest('#contacts-wrap');
    const addContactBtn = contactsWrap.nextElementSibling;

    newContact.remove();

    if (contactsWrap.children.length <= 0) {
      contactsBlock.classList.remove('showed');
    }
    if (contactsWrap.children.length <= 9) {
      addContactBtn.classList.remove('hidden');
    }
  });

  newContactInput.addEventListener('input', (e) => {
    const clearBtn = e.currentTarget.nextElementSibling;
    if (newContactInput.value !== '') {
      clearBtn.classList.add('visible');
    }
  });

  if (window.innerWidth <= 550) {
    newContactInput.placeholder = 'Введите данные';
  }

  return newContact;
}
