import { defineStore } from "pinia";
import axios from 'axios';

export const useManagerStore = defineStore('managersStore', {
    state: () => ({
        gridData: [],
        gridColumns: [
            { title: 'Артикул', key: 'id' },
            { title: 'Товар', key: 'name' },
            { title: 'Категория', key: 'category' },
            { title: 'Цена', key: 'price' },
            { title: 'Колличество', key: 'quantity' },
            { title: 'Действия', key: 'actions', sortable: false }
        ],
        zakazCard: []
    }),
    action: {
        // получение всех заказов
        async getDats() {
            const response = await axios.get('http://localhost:3000/zakaz');
            this.zakazCard = response.data;
        },
    }
})