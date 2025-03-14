export async function userDelete(url) {
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка удаления пользователя: ' + response.statusText);
            }
        })
        .then(data => {
            console.log('Пользователь успешно удалён: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Ошибка при изменении пользователя:', error);
            throw error;
        });
}