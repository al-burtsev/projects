import { fbIcon, vkIcon, phoneIcon, mailIcon, defaultIcon } from '../_iconSprite.js'

export function formatContacts(contacts) {
    let contactsContainer = ``;
    let icon = defaultIcon;

    contacts.forEach((item) => {
        const { type, value } = item;

        switch (type) {
            case "Facebook":
                icon = fbIcon;
                break
            case "VK":
                icon = vkIcon;
                break
            case "Телефон":
                icon = phoneIcon;
                break
            case "Email":
                icon = mailIcon;
                break
            default:
                icon = defaultIcon;
        }

        const tooltipText = type === "Телефон" ? `${value}` : `${type}: ${value}`;

        const tooltip = `<div class="tooltip">
        <button class="btn-reset tooltip__btn" data-tippy-content="${tooltipText}">${icon}</button>
        </div>`

        contactsContainer += tooltip;
    });

    if (contacts.length >= 6) {
        const elemsAlwaysShown = 4;
        const moreContactsBtn = `<button class="btn-reset more-contacts">+${contacts.length - elemsAlwaysShown}</button>`
        contactsContainer += moreContactsBtn;
    }

    return contactsContainer;
}