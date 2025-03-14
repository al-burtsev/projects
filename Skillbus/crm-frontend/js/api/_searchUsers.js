export async function searchUsers(str) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/?search=${str}`);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const users = await response.json();

    return users;
  } catch (error) {
    console.error('Ничего не найдено:', error);
    throw error;
  }
}
