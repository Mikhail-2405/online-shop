import {createRouter, createWebHistory} from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import CartPage from '@/pages/CartPage.vue';
import ManagerZakaz from '@/pages/ManagerZakaz';
import ManagerDataPage from '@/pages/ManagerDataPage';
import ManagerLog from '@/pages/ManagerLog';
import LoginViev from '@/pages/LoginViev';
import AdminPage from '@/pages/AdminPage';
import UsersPage from '@/pages/UsersPage'

import { useAuthStore } from '../stores/AuthStore.js';

const routes = [
    // страница магазина
    {
        path: '/',
        component: MainPage,
    },
    // страница корзины
    {
        path: '/card',
        component: CartPage,
    },
    // страница для входа
    {
        path: '/login',
        component: LoginViev,
    },
    // страница для менеджеров
    {
        path: '/manager',
        component: ManagerLog,
        children: [
            {
                path: 'zakaz',
                component: ManagerZakaz,
            },
            {
                path: 'data',
                component: ManagerDataPage,
            },
        ]
    },
    // страница для администратора
    {
        path: '/admin',
        component: AdminPage,
        children: [
            {
                path: 'data',
                component: ManagerDataPage,
            },
            {
                path: 'users',
                component: UsersPage,
            },
        ]
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});
// правило запрещающее переходить по ссылкам
router.beforeEach(async (to) => {
    const publicPages = ['/login', '/', '/card'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
export default router;