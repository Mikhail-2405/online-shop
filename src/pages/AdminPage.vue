<template>
    <!-- шапка панели администратора -->
    <v-toolbar color="white" class="mb-6">
        <span style="margin-left: 30px;">Пользователь: {{ this.user }}</span>

        <template v-slot:append>
            <v-btn @click="$router.push('/admin/users')">
                Пользователи
            </v-btn>
            <v-btn @click="$router.push('/admin/data')">
                База данных
            </v-btn>
            <div class="text-center">
                <v-dialog
                v-model="dialog"
                width="350px"
                padding="10px"
                >
                <template v-slot:activator="{ props }">
                    <v-btn
                    v-bind="props"
                    >
                    Добавить пользователя
                    </v-btn>
                </template>

                <v-card class="pa-4">
                    <v-text-field
                        v-model="editedItem.login"
                        label="Логин"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.name"
                        label="ФИО"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.job"
                        label="Должность"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        required
                    ></v-text-field>

                    <div class="btn">
                        <v-btn 
                        density="comfortable"
                        @click="dialog = false"
                        >Отмена</v-btn>
                        <v-btn 
                        density="comfortable"
                        @click="additUsers(this.editedItem)"
                        >Добавить</v-btn>
                    </div>
                </v-card>
                </v-dialog>
            </div>
            <v-btn icon @click="close">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </template>
    </v-toolbar>
    <line-separation/>
    <router-view></router-view>
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
            // функция отвечающая за удаления пользователя из общего хранилища 
            close() {
                this.$router.push('/login');
                this.logout();
            },
            // функция отвечающая за передачу пользователя, который вошел
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
        // функция отвечающая за получение всех пользователей
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