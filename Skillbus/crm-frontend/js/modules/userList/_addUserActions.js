import { cancelIcon, editIcon } from '../_iconSprite.js'

export function userActions(id) {
    return `<button class="btn-reset userboard__btn" data-user-id="${id}" data-action="edit">${editIcon} Изменить</button> <button class="btn-reset userboard__btn" data-user-id="${id}" data-action="delete">${cancelIcon} Удалить</button>`
}