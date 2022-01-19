import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('./components/Home.vue');
const Login = () => import('./components/Login.vue');

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
