export function errorHandler(selector, error) {
    const errorElem = document.createElement('div');
    errorElem.classList.add('error-msg');
    errorElem.textContent = error.message ?? 'Что-то пошло не так';
    setTimeout(() => {
        selector.before(errorElem)
    }, 300);
}