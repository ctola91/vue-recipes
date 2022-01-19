import { createApp } from 'vue'
import Router from "./router";

import('bulma/css/bulma.css');

import App from './App.vue'

const app = createApp(App);
app.use(Router);
app.mount('#app')
