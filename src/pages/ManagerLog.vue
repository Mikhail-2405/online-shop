<template>
    <!-- шапка менеджера -->
    <div>
        <v-toolbar color="white" class="mb-6">
            <span style="margin-left: 30px;">Пользователь: {{ this.user }}</span>

            <v-spacer></v-spacer>
            <!-- кнопки с заказами, базой товара и выход -->
            <template v-slot:append>
                <v-btn @click="$router.push('/manager/zakaz')">
                    Заказы
                </v-btn>
                <v-btn @click="$router.push('/manager/data')">
                    База данных
                </v-btn>
                <v-btn icon @click="close">
                    <v-icon>mdi-export</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
        <line-separation/>
        <router-view></router-view>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/AuthStore.js';
import { mapState, mapActions } from 'pinia';
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            ...mapActions(useAuthStore, ['logout']),
            // выход
            close() {
                this.$router.push('/login');
                this.logout();
            }
        },
        computed: {
            ...mapState(useAuthStore, ['user']),
        },
    }
</script>

<style scoped>

</style>