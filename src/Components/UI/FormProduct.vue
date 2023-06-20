<template>
    <!-- карточка товара -->
    <div class="form__product" v-for="item in product" :key="item.id">
        <v-col cols="auto">
            <v-dialog
                transition="dialog-top-transition"
                width="auto"
            >
                <!-- информация о товаре -->
                <template v-slot:activator="{ props }">
                    <!-- картинка товара -->
                <div v-bind="props" class="window__product-img">
                    <img :src="item.img" alt="" style="max-width: 270px; max-height: 250px;">
                </div>
                </template>
                <template v-slot:default="{ isActive }">
                <v-card>
                    <v-card-text>
                    <div class="pa-4 d-flex flex-column align-center">
                        <img :src="item.img" alt="" style="max-width: 250px; max-height: 400px;">
                        
                        <div class="window__product-name">
                            <!-- название товара -->
                            <h2 >{{ item.name }}</h2>
                            <!-- цена товара -->
                            <h2>{{ item.price }} ₽</h2>
                            <span>Описание:</span>
                        </div>
                        <!-- опичание товара -->
                        <p class="text-center">{{ item.body }}</p>
                        
                    </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <!-- кнопка закрытия информации о продукте -->
                    <v-btn
                        variant="text"
                        @click="isActive.value = false"
                    >Закрыть</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
        </v-col>
        <!-- название товара -->
        <h2 class="form__product-name">{{ item.name }}</h2>
        <!-- цена товара -->
        <div class="form__product-price">
            <span>{{ item.price }} ₽</span>
            <!-- кнопка добавления товара в корзину -->
            <v-btn @click="addProductCard({...item})" rounded="xl">
                Добавить
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'pinia'
    import { useProductStore } from '../../stores/ProductStore.js';

    export default {
        name: 'form-product',
        props: {
            product: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            ...mapActions(useProductStore, ['addProductCard'])
        }
    }
</script>

<style scoped>
.window__product-img {
    height: 240px;
}
.form__product {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 293px;
    margin: 0px 8px 20px 12px;
    padding: 8px 0px 8px 0px;
    border: 2px solid rgb(143, 135, 135);
    border-radius: 15px;
}
.form__product-name {
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.01em;
    height: 37px;
}
.form__product-price {
    margin-top: 17px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.form__product-price span {
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
}
.form__product-batton {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    width: 132px;
    height: 28px;
    border-radius: 20px;
    border: 1px solid #928986;
    color: #928986;
}
.form__product-batton i {
    width: 22px;
    height: 22px;
    font-weight: 700;
    font-size: 15px;
    line-height: 23px;
    color: #928986;
    text-align: center;
}
p {
    max-width: 400px;
}
</style>