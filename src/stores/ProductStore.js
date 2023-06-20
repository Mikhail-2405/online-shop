import { defineStore } from "pinia";
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        // массив со всеми продуктами
        products: [],
        // массив продуктов в корзине
        productCard:  JSON.parse(localStorage.getItem('productCard')) || [],
        // категории
        categRroduct: [
            {id: '1', name: 'Запчасти'},
            {id: '2', name: 'Масла'},
            {id: '3', name: 'Шины'},
            {id: '4', name: 'Жидкости'},
            {id: '5', name: 'Аккумуляторы'},
        ],
        // сортировка
        sortOptions: [
            {value: 'price', name: 'По цене'},
            {value: 'name', name: 'По алфавиту'},
        ],
        // манеджер стор
        gridColumns: [
            { title: 'Артикул', key: 'id' },
            { title: 'Товар', key: 'name' },
            { title: 'Категория', key: 'category' },
            { title: 'Цена', key: 'price' },
            { title: 'Колличество', key: 'quantity' },
            { title: 'Действия', key: 'actions', sortable: false }
        ],
        // заказы
        zakaz: [],
    }),
    getters: {
        // колличество всех товаров в корзине
        allproductsQuantity() {
            return this.productCard.reduce((sum, item) => {return sum + item.count}, 0)
        },
        // сумма всех товаров в корзине
        allSumProduct() {
            return this.productCard.map(item => item.price * item.count).reduce((sum, item) => {return sum + item}, 0)
        },
    },
    actions: {
        // менеджер
        // загрузка заказов
        async getDataZakaz() {
            const url = 'http://localhost:3000/zakaz';
            const response = await axios.get(url);
            this.zakaz = response.data;
        },
        // отклонение заказа
        async removeZakaz(item) {
            await axios.delete(`http://localhost:3000/zakaz/${item}`);
            const idx = this.zakaz.findIndex(i => i.id === item)
            this.zakaz.splice(idx, 1)
        },
        // принятие заказа
        async addingZakaz(item) {
            const zakaz = await axios.put(`http://localhost:3000/zakaz/${item.id}`, item);
            if (zakaz) {
                const idx = this.zakaz.findIndex(i => i.id === item.id)
                this.zakaz.splice(idx, 1, item)
            }
        },
        // изменение товара
        async saveProduct(editedItem) {
            const ok = await axios.put(`http://localhost:3000/product/${editedItem.id}`, editedItem);
            if (ok) {
                const idx = this.products.findIndex(i => i.id === editedItem.id)
                this.products.splice(idx, 1, editedItem)
            }
        },
        // добавления товара
        async pushProduct(editedItem) {
            await axios.post('http://localhost:3000/product', {
                ...editedItem
            });
            this.products.push(editedItem)
        },
        // удаление товара
        async delProduct(item) {
            await axios.delete(`http://localhost:3000/product/${item}`);
            const idx = this.products.findIndex(i => i.id === item)
            this.products.splice(idx, 1)
        },




        // пользователь
        // загрузка товара с сервера по категориям
        async getCategoryData(e) {
            if (e < this.categRroduct.length + 1) {
            const response = await axios.get(`http://localhost:3000/product/?category=${e}`);
            this.products = response.data;
            } else {
                this.getData()
            }
        },
        // загрузка товара с сервера
        async getData() {
            const url = 'http://localhost:3000/product/?';
            const response = await axios.get(url);
            this.products = response.data;
        },
        // добавление товара в корзину
        addProductCard(el) {
            const x = this.productCard.find(item => item.id == el.id);
            if (!x || this.productCard.length == 0) {
                el.count = 1;
                this.productCard.push(el);
            } else {
                this.productCard.forEach(item => {
                    if (item.id === el.id) {
                        item.count += 1;
                    }
                })
            } 
            localStorage.setItem('productCard', JSON.stringify(this.productCard))
        },
        // уменьшает количество товара
        minProductCard(el) {
            this.productCard.map(item => {
                if (item.id == el && item.count > 1) {
                    item.count--
                } 
            })
        },
        // удаляет товар из корзины
        removeProductCard(el) {
            this.productCard = this.productCard.filter(item => item.id !== el)
            localStorage.setItem('productCard', JSON.stringify(this.productCard))
        },
        // удаляет все товары из корзины
        clearCard() {
            this.productCard = []
            // this.productCardLocal = []
            localStorage.removeItem('productCard')
        },
        // сортировка товара по алфавиту и цене
        changeOptions(e) {
            if (e.target.value === 'price') {
                this.products.sort((item1, item2) => {
                    return item1.price - item2.price
                })
            } else {
                this.products.sort((item1, item2) => {
                    return item1.name > item2.name ? 1 : -1
                })
            } 
        },
    },
});
