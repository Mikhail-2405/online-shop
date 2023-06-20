import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/users';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    // получение всех пользователей
    actions: {
        async getAll() {
            this.users = { loading: true };
            const response = await axios.get(baseUrl);
            this.users = response.data;
        }
    }
});