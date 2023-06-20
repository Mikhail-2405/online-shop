<template>
    <!-- форма карточки в корзине -->
    <div v-for="it in optionsCard" :key="it.id" class="bassket__form">     
        <div class="bassket__form-item">
            <!-- картинка товара -->
            <img :src="it.img" alt="" style="max-width: 75px; max-height: 80px;">
            <div>
                <!-- название товара -->
                <h3>{{ it.name }}</h3>
            </div>
        </div>
        <div class="bassket__form-add">
            <!-- кнопка уменьшения колличества -->
            <button @click="minProductCard(it.id)" class="bassket__form-btn">-</button>
            <!-- колличество товара в корзине -->
            <span>{{ it.count }}</span>
            <!-- кнопка увеличения колличества -->
            <button @click="addProductCard({...it})" class="bassket__form-btn">+</button>
        </div>
        <span>{{ it.price * it.count }} ₽</span>
        <deleteSvg @click="removeProductCard(it.id)"/>
    </div>
</template>

<script>
import deleteSvg from '../../assets/deleteSvg.vue'
import { useProductStore } from '../../stores/ProductStore.js';
import { mapActions } from 'pinia';
    
    export default {
        name: 'form-card',
        components: {
            deleteSvg
        },
        props: {
            optionsCard: {
                type: Array,
                default: () => {}
            }
        },
        methods: {
            ...mapActions(useProductStore, ['addProductCard', 'minProductCard', 'removeProductCard']),
        },
    }
</script>

<style scoped>
.bassket__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid #F4F4F4;
    margin-bottom: 8px;
}
.bassket__form-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 280px;
}
.bassket__form-item img {
    width: 80px;
    height: 80px;
    margin: 0px 15px 0px 15px;
}
.bassket__form-add span {
    margin: 0px 12px 0px 12px;
}
.bassket__form-btn {
    width: 32px;
    height: 32px;
    background: #FFFFFF;
    border: 2px solid #a8a1a1;
    border-radius: 16px;
    color: #a8a1a1;
    cursor: pointer;
}
</style>