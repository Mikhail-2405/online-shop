import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // пользователь который вошел
        user: localStorage.getItem('user') || '',
        returnUrl: null,
        // все пользователи
        users: []
    }),
    actions: {
        // полный список пользователей
        async getAll() {
            this.users = { loading: true };
            const response = await axios.get('http://localhost:3000/users/');
            this.users = response.data
        },
        // удаление пользователя
        async deleteUser(item) {
            await axios.delete(`http://localhost:3000/users/${item}`);
            const idx = this.users.findIndex(i => i.id === item);
            this.users.splice(idx, 1);
        },
        // изменение данных пользователя
        async saveUsers(item) {
            const ok = await axios.put(`http://localhost:3000/users/${item.id}`, item);
            if (ok) {
                const idx = this.users.findIndex(i => i.id === item.id);
                this.users.splice(idx, 1, item);
            }
        },
        // добавить пользователя
        async addUsers(item) {
            await axios.post('http://localhost:3000/users/', {...item});
            this.users.push(item);
        },
        // пользователь, который вошел
        async login(item) {
            this.user = item;
            localStorage.setItem('user', item)
        },
        // выход пользователя
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});