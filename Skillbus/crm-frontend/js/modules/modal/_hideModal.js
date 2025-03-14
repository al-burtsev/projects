export function hideModal(modal, delay) {
    setTimeout(() => {
        modal.classList.remove('active');
    }, delay)
    setTimeout(() => {
        modal.remove();
    }, delay * 2);
}