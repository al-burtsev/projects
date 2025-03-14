import { userDelete } from '../../api/_deleteUser.js'
import { userListUpdate } from '../../api/_updateUsers.js';
import { state } from '../../main.js'
import { tBodyEl } from '../../main.js';
import { hideModal } from './_hideModal.js';
import { addTinyLoader } from '../loader/_addTinyLoader.js';


export function initDeleteMode(modalTitle, modalForm, userData, submitBtn) {
    modalTitle.textContent = "Удалить клиента";
    submitBtn.textContent = "Удалить";
    modalTitle.classList.add('delete');
    submitBtn.classList.add('delete');

    const inputWraps = modalForm.querySelectorAll('.field-wrapper');
    inputWraps.forEach((elem) => {
        elem.remove();
    });

    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        addTinyLoader(submitBtn);

        const userId = userData.id;
        
        await userDelete(`http://localhost:3000/api/clients/${userId}`);
        await userListUpdate(state, tBodyEl);

        hideModal(state.modal, 600)
    });
}