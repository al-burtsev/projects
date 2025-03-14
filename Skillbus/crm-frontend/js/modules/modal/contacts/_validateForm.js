export function validateForm(form) {
    let isValid = true;
    const allInputs = form.querySelectorAll('input');
    const inputsToValidate = [...allInputs].filter((input) => input.hasAttribute('required'));
    const btnWrap = form.querySelector('.modal__wrap-btn');
    const errorElem = document.createElement('div');

    errorElem.classList.add('error-msg');

    if (btnWrap.previousElementSibling.classList.contains('error-msg')) {
        btnWrap.previousElementSibling.remove();
    }

    inputsToValidate.forEach((input) => {
        if (input.value === "") {

            const isContact = input.hasAttribute(['data-contact']);
            console.log(isContact)

            isValid = false;
            errorElem.textContent = 'Заполните обязательные поля!';
            input.classList.add('warning');
        } else if (input.value.length < 3) {
            isValid = false;
            errorElem.textContent = 'Введите не менее 3 символов';
            input.classList.add('warning');
        } else {
            input.classList.remove('warning');
        }

        if (!isValid) {
            btnWrap.before(errorElem);
        }

        input.addEventListener('input', () => {
            errorElem.remove();
            input.classList.remove('warning');
            isValid = true; 
        });
    });

    console.log(isValid);
    return isValid;
}