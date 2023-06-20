<template>
    <!-- карточка для создания учетной записи -->
    <div class="users__form">
        <div class="users__form-card" v-for="(item, ind) in this.users" :key="ind">
            <v-text-field
                v-model="item.login"
                label="Логин"
                required
            ></v-text-field>
            <v-text-field
                v-model="item.name"
                label="ФИО"
                required
            ></v-text-field>
            <v-text-field
                v-model="item.job"
                label="Должность"
                required
            ></v-text-field>
            <v-text-field
                v-model="item.password"
                label="Password"
                required
            ></v-text-field>
            <div class="btn" v-show="!item.state">
                <v-btn 
                density="compact"
                @click="deleteUser(item.id)">
                    Удалить
                </v-btn>
                <v-btn 
                density="compact"
                @click="saveUsers(item)">
                    Изменить
                </v-btn>
            </div>
        </div>
    </div>

</template>

<script>
import { useAuthStore } from '../stores/AuthStore.js';
import { mapState, mapActions } from 'pinia';
    export default {
        data() {
            return {
                dialog: false,
                editedItem: {
                    id: null,
                    login: '',
                    name: '',
                    job: '',
                    password: '',
                    status: null
                },
            }
        },
        computed: {
            ...mapState(useAuthStore, ['user', 'users']),
        },
        methods: {
            ...mapActions(useAuthStore, ['logout', 'getAll', 'deleteUser', 'saveUsers', 'addUsers']),
            // выход
            close() {
                this.$router.push('/login');
                this.logout();
            },
            // добавление учетной записи
            additUsers(item) {
                this.dialog = false;
                this.addUsers(item);
                this.editedItem = {
                    id: null,
                    login: '',
                    name: '',
                    job: '',
                    password: '',
                    status: null
                }
            }
        },
        // получение всех пользователей
        async mounted() {
            this.getAll()
        }
    }
</script>

<style scoped>
.users__form {
    display: flex;
    flex-wrap: wrap;
}
.users__form-card {
    width: 350px;
    margin: 10px;
    padding: 15px 6px;
    border: 1px solid rgb(129, 116, 116);
    border-radius: 5px;
}
.btn {
    display: flex;
    justify-content: space-around;
}
</style>