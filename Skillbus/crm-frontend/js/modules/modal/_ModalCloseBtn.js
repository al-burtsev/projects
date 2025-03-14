export function ModalCloseBtn() {
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn-reset', 'close-btn', 'modal__close-btn');
    return closeBtn;
}