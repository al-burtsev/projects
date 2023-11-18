// let phone = document.querySelector("input[type='tel']")
// var im = new Inputmask("+7 (999) 999-99-99")
// im.mask(phone);

const validation = new JustValidate('#contactsForm');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Введите минимум 3 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Заполните это поле!',
    },
  ])
  .addField('#phone', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Введите минимум 10 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Заполните это поле!',
    },
    {
      rule: 'number',
      errorMessage: "Недопустимый формат",
    },
  ]);