import { fetchUsers } from './_fetchUsers.js';
import { render } from '../main.js'

export async function userListUpdate(state, container) {
    try {
        const users = await fetchUsers();
        state.users = users;
        if (users) {
            setTimeout(() => {
                state.renderProcess.state = 'rendering';
                render(state, container);
            }, 600)
       }
    } catch (error) {
        state.renderProcess.state = 'failed';
    } 
}
