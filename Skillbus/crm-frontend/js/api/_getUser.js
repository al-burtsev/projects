export async function getUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/clients/${userId}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Не удалось получить пользователя:', error);
        throw error;
    }
}