export function createNewChoices(selector) {
    const choices = new Choices(selector, {
        choices: [{
            value: 'Facebook',
            label: 'Facebook',
            id: 1,
        },
        {
            value: 'VK',
            label: 'VK',
            id: 2,
        },
        {
            value: 'Телефон',
            label: 'Телефон',
            id: 3,
        },
        {
            value: 'Email',
            label: 'Email',
            id: 4,
        },
        {
            value: 'Другое',
            label: 'Другое',
            id: 5,
        }],
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        position: 'bottom',
        duplicateItemsAllowed: false,
        classNames: {
            containerOuter: ['choices', 'contact-item__select'],
        },
    });

    return choices;
} 