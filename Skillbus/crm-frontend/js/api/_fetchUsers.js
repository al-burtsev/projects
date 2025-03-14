export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        
        const users = await response.json();
        
        return users;
    } catch (error) {
        console.error('Не удалось получить пользователей:', error);
        throw error;
    }
}