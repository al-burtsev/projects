export async function editUser(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });

        if (!response.ok) {
            throw new Error('Ошибка при изменении пользователя: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Пользователь изменен:', result);
    } catch (error) {
        console.error('Ошибка при изменении пользователя:', error);
        throw error;
    }
}