import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import('./components/Home.vue');
const Login = () => import('./components/Login.vue');
const Signup = () => import('./components/Signup.vue');

const beforeEnter = (_to: any, _from: any, next: any) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (isAuthenticated) next();
    else next({ name: 'Login' });
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
