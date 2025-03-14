export async function addUser(url, data) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data
		});

		if (!response.ok) {
			throw new Error('Ошибка при добавлении пользователя: ' + response.statusText);
		}

		const result = await response.json();
		console.log('Пользователь добавлен:', result);
	} catch (error) {
		throw error;
	}
}