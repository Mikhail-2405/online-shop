<template>
    <!-- страница магазина -->
    <div v-if="!isLoaded" style="width: 100%; 
        display: flex;
        flex-direction: column;
        align-items: center;
    ">
        <!-- логотип и кнопка коризны -->
        <div class="header">
            <logo-shop/>
            <my-button 
                @click="$router.push('/card')"
                class="button__card"
            >
                <span>{{ allSumProduct }} ₽</span>
                <div class="delimiter"></div>
                <cardSvg/>
                <span>{{ allproductsQuantity }}</span>
            </my-button>
        </div>
        <line-separation/>
        <!-- категории и сортировка товара -->
        <div class="categ__sort">
            <CategoryProduct
            :category="categRroduct"
            />
            <SortProduct 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <line-separation/>
        <!-- карточки товара -->
        <div style="display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
        ">
            <form-product :product="products"/>
        </div>
        
    </div>
</template>


<script>
import CategoryProduct from '@/Components/CategoryProduct.vue'
import SortProduct from '@/Components/SortProduct.vue'
import cardSvg from '@/assets/cardSvg.vue'

import { useProductStore } from '../stores/ProductStore.js';
import { mapState, mapActions } from 'pinia';

export default {
    components: {
        CategoryProduct,
        SortProduct,
        cardSvg,
    },
    data() {
        return {
            isLoaded: false,
            selectedSort: '',
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'allproductsQuantity', 'allSumProduct', 'categRroduct', 'sortOptions']),
    },
    methods: {
        ...mapActions(useProductStore, ['getData']),
    },
    //  функция отвечающая за загрузку товара с сервера
    async mounted() {
        this.isLoaded = true;
        this.getData();
        this.isLoaded = false;
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-around;
    width: 85%;
}
.logo {
    display: flex;
    align-items: center;
    width: 70%;
}
.logo__text {
    margin-left: 15px;
}
h1 {
    margin: 0px;
}
.delimiter {
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    height: 25px;
    padding-left: 13px;
    margin-left: 13px;
}
.line {
    display: flex;
    border-top: 1px solid black;
    width: 100%;
    margin: 30px 0px 40px 0px;
}
.categ__sort {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
}
.button__card {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #928986;
    border-radius: 30px;
    width: 150px;
    height: 50px;
    text-decoration: none;
    color: white;
}
</style>