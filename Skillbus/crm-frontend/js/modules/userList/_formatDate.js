export function formatDate(dateStr) {
    const date = new Date(dateStr);

    const datePart = date.toLocaleString('ru-RU',
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }
    );

    const timePart = date.toLocaleString('ru-RU',
        {
            hour: 'numeric',
            minute: 'numeric',
        }
    );

    return { datePart, timePart };
};