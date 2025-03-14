import { convertToKebabCase } from '../functions/_convertToKebabCase.js';
import { formatName } from './_formatName.js';
import { formatDate } from './_formatDate.js';
import { formatContacts } from './_formatContacts.js';
import { userActions } from './_addUserActions.js';
import { formatId } from './_formatId.js';

export function createUserList(data, container) {
    data.forEach((user) => {
        const trEl = document.createElement('tr');

        const { id,
            createdAt,
            updatedAt,
            name,
            surname,
            lastName,
            contacts
        } = user;

        const modifiedUser = {
            id: formatId(id),
            fullName: formatName(name, surname, lastName),
            createdAt: formatDate(createdAt),
            updatedAt: formatDate(updatedAt),
            contacts: formatContacts(contacts),
            actions: userActions(id),
        };

        for (let key in modifiedUser) {
            const tdEl = document.createElement('td');
            switch (key) {
                case 'createdAt':
                case 'updatedAt':

                    const { datePart, timePart } = modifiedUser[key];
                    tdEl.innerHTML = `<div class="${convertToKebabCase(key)}"><span class="date">${datePart}</span><span class="time">${timePart}</span></div>`;
                    break;

                case 'contacts':
                    if (contacts.length >= 6) {
                        tdEl.innerHTML = `<div class="${convertToKebabCase(key)} over-5">${modifiedUser[key]}</div>`;
                        break;
                    }

                default:
                    tdEl.innerHTML = `<div class="${convertToKebabCase(key)}">${modifiedUser[key]}</div>`;
                    break;

            }

            trEl.append(tdEl);
        };

        container.append(trEl);
    });

    tippy('.tooltip__btn', {
        trigger: 'mouseenter click',
        theme: 'custom',
        interactive: true,
        zIndex: 10,       
    });
}
