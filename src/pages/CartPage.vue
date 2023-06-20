<template>
    <!-- страница корзины -->
    <div style="width: 100%; 
        display: flex;
        flex-direction: column;
        align-items: center;">
        <logo-shop/>
        <line-separation/>
        <!-- отображается если корзина пустая -->
        <div v-if="!productCard.length" class="basket__empty">
            <h2>Корзина пустая 😕</h2>
            <p>Вероятней всего, вы не заказывали запчасти.</p>
            <p>Для того, чтобы заказать, перейдите на главную страницу.</p>    
            <img src="../assets/empty-cart.png" alt="">    
            <my-button @click="$router.push('/')" class="btn__end">Вернуться назад</my-button>
        </div>
        <!-- отоброжается если пользователь добавил товар -->
        <div v-else class="basket__active">
            <div style="display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            ">
                <h2>Корзина</h2>
                <!-- кнопка очищения корзины -->
                <deleteSvg @click="clearCard()"/>
            </div>
            <form-card :optionsCard="productCard"/>
            <!-- отображения колличества товара и общая сумма -->
            <div class="bassket__info">
                <span>Колличество: <i>{{ allproductsQuantity }} шт.</i></span>
                <span>Сумма заказа: <i>{{ allSumProduct }} ₽</i></span>
            </div>
            <!-- кнопки возврата в магазин или покупка товара -->
            <div class="basket__btn">  
                <my-button @click="$router.push('/')" class="btn__end">Вернуться назад</my-button>
                <my-button @click="showModal = true" class="btn-pay">Оплатить сейчас</my-button>
            </div>
        </div>
        <!-- модальное окно при покупке -->
        <modal-window 
        v-if="showModal"
        :optionShow="showModal"
        :productCard="productCard"
        v-on:showModalWindow="openModel"
        />
    </div>
</template>

<script>
import deleteSvg from '../assets/deleteSvg.vue'
import { useProductStore } from '../stores/ProductStore.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            card: this.productCard,
            showModal: false
        }
    },
    components: {
        deleteSvg
    },
    computed: {
        ...mapState(useProductStore, ['productCard','allproductsQuantity', 'allSumProduct']),
    },
    methods: {
        ...mapActions(useProductStore, ['clearCard']),
        // функция отвечающая за открытие и закрытие товара
        openModel(e) {
            this.showModal = !e
        },
    },
}
</script>

<style scoped>
.basket__active {
    width: 70%;
    margin-bottom: 100px;
}
.bassket__info {
    display: flex;
    justify-content: space-between;
    margin: 40px 0px 40px 0px;
    font-weight: 400;
    font-size: 22px;
    line-height: 27px;
}
.basket__btn {
    display: flex;
    justify-content: space-between;
}
.btn__end {
    width: 160px;
    height: 30px;
    font-weight: 400;
    color: #584646;
    border: 1px solid black;
}
.btn-pay {
    width: 160px;
    height: 30px;
    font-weight: 700;
    color: #FFFFFF;
    background: #928986;
}
.basket__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.basket__empty p {
    font-size: 20px;
}
.basket__empty img {
    margin-bottom: 35px;
}
</style>