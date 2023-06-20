<template>
    <!-- форма для входа -->
    <v-sheet class=" pa-12 h-100 d-flex align-center" rounded>
        <v-card class="mx-auto px-6 py-8" width="344">
            <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >
                <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="Логин"
                ></v-text-field>

                <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                label="Пароль"
                placeholder="Введите пароль"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
                ></v-text-field>

                <br>

                <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                variant="elevated"
                @click="onLogin(email, password)"
                :rules="[required]"
                >
                Войти
                  <v-overlay
                  activator="parent"
                  location-strategy="connected"
                  scroll-strategy="close"
                  >
                     <v-card class="pa-2">
                        Неверный логин или пароль!
                     </v-card>
                  </v-overlay>
                </v-btn>
            </v-form>
        </v-card>
  </v-sheet>
</template>

<script>
import { useAuthStore } from '../stores/AuthStore.js';
import { mapState, mapActions } from 'pinia';

 export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
      show1: false,
    }),

    methods: {
      // функция выводит сообщение при не верной авторизации
      onSubmit () {
        if (!this.form) return
        this.loading = true
        setTimeout(() => (this.loading = false), 1000)
      },
      // функция проверяющая заполнения данных
      required (v) {
        return !!v || 'Обязательно для заполнения'
      },
      ...mapActions(useAuthStore, ['getAll', 'login']),
      // функция за аутентификацию
      onLogin(username, password) {
         this.users.map(item => {
            if (item.status == true && item.login == username && item.password == password) {
              this.login(item.login);
              this.$router.push('/admin/users');
            } else if (item.login == username && item.password == password) {
              this.login(item.login);
              this.$router.push('/manager/zakaz');
            }
         })
      }
      
    },
    computed: {
        ...mapState(useAuthStore, ['users', 'user']),
    },
    // функция для получения всех пользователей
    async mounted() {
      this.getAll()
    }
  }
</script>

