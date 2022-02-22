import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthService from './services/AuthService';

const Home = () => import('./components/Home.vue');
const Login = () => import('./components/Login.vue');
const Signup = () => import('./components/Signup.vue');
const Dashboard = () => import('./components/Dashboard.vue');
const RecipeForm = () => import('./components/RecipeForm.vue');

const beforeEnter = (_to: any, _from: any, next: any) => {
    AuthService.isLoggedIn(() => next(), () => next({ name: 'Login' }));
    // const isAuthenticated = localStorage.getItem('token') !== null;
    // if (isAuthenticated) next();
    // else next({ name: 'Login' });
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter
    },
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: Dashboard,
    //     beforeEnter
    // },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/recipes/new',
        name: 'RecipeForm',
        component: RecipeForm,
        beforeEnter
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
