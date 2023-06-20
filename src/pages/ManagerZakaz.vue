<template>
    <!-- заказы клиентов -->
    <v-container color="basil">
        <v-tabs
        v-model="tab"
        bg-color="transparent"
        color="basil"
        grow
        >
        <v-tab
            v-for="item in items"
            :key="item"
            :value="item"
        >
            {{ item }}
        </v-tab>
        </v-tabs>

        <v-window v-model="tab">
        <v-window-item
            v-for="zag, index in items"
            :key="index"
            :value="zag"
        >
            <v-card
            color="basil"
            flat
            class="d-flex flex-wrap"
            >

                <div v-for="item in zakaz" :key="item.id">
                    <div class="card__info" v-if="item.state == index">
                        <h2>Заказ № {{ item.id }}</h2>
                        <v-container>
                            <div v-show="!item.state">
                                <v-text-field clearable label="ФИО" variant="outlined" v-model="item.name"></v-text-field>
                                <v-text-field clearable label="Телефон" variant="outlined" v-model="item.tel"></v-text-field>
                                <v-text-field clearable label="Почта" variant="outlined" v-model="item.email"></v-text-field>
                                <v-text-field clearable label="Адрес" variant="outlined" v-model="item.adress"></v-text-field>
                                <v-text-field clearable label="Доставка" variant="outlined" v-model="item.delivery"></v-text-field>
                            </div>
                            <!-- информация о клиенте -->
                            <div class="card__info-client" v-show="item.state">
                                <span>ФИО: {{ item.name }}</span>
                                <span>Тел: {{ item.tel }}</span>
                                <span>Почта: {{ item.email }}</span>
                                <span>Адрес: {{ item.adress }}</span>
                                <span>Доставка: {{ item.delivery }}</span>
                            </div>
                            <!-- информация о товаре -->
                            <div class="card__info-product" >
                                <v-card
                                    class="overflow-y-auto mb-2"
                                    height="150"
                                    
                                >
                                    <v-card-text>
                                        <div v-for="el in item.prod" :key="el.id">
                                            <span>Товар: {{ el.name }}, {{ el.count }} шт.</span>
                                        </div>
                                    </v-card-text>
                                </v-card>
                                <span>Кол-во всего товара: {{ this.allCount(item) }} шт.</span>
                                <span>Сумма заказа: {{ this.allSum(item) }} ₽</span>
                            </div>
                            <!-- кнопки принятия или отмены заказа -->
                            <div class="card__info-btn" v-show="!item.state">
                                <v-btn 
                                density="compact"
                                @click="removeZakaz(item.id)">
                                    Отклонить
                                </v-btn>
                                <v-btn 
                                density="compact"
                                @click="addZakaz(item)">
                                    Принять
                                </v-btn>
                            </div>

                            <div class="card__info-btn" v-show="item.state">
                                <v-btn 
                                density="compact"
                                @click="removeZakaz(item.id)">
                                    завершить
                                </v-btn>
                            
                            </div>

                        </v-container>
                    </div>
                </div>
            </v-card>
        </v-window-item>
        </v-window>
    </v-container>
</template>

<script>
import { useProductStore } from '../stores/ProductStore.js';
import { mapState, mapActions } from 'pinia';
    export default {
        components: {
        },
        data() {
            return {
                tab: 'Новые заказы',
                items: [
                'Новые заказы', 'Принятые заказы'
                ],
            }
        },
        computed: {
        ...mapState(useProductStore, ['zakaz', 'clientColumns']),
        },
        methods: {
            // вся сумма заказа
            allSum(item) {
                return item.prod.map(item => item.price * item.count).reduce((sum, item) => {return sum + item}, 0)
            },
            // колличество товара в заказе
            allCount(item) {
                return item.prod.reduce((sum, item) => {return sum + item.count}, 0)
            },
            ...mapActions(useProductStore, ['getDataZakaz', 'removeZakaz', 'addingZakaz']),
            // одобрение заказа
            addZakaz(item) {
                item.state = true;
                this.addingZakaz(item)
            }
        },
        // получение заказаов с сервера
        async mounted() {
            this.getDataZakaz();
        }
    }
</script>

<style scoped>
.card__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    /* width: 80%; */
    margin: 15px 12px 20px 12px;
    padding: 0px 2px;
    border: 2px solid rgb(143, 135, 135);
    border-radius: 15px;
}
.card__info-client, .card__info-product {
    display: flex;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
.card__info-btn {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
