import { createWebHistory, createRouter } from 'vue-router'

import Form from '../components/Form.vue'
import Home from '../components/Home.vue'

const routes = [
    { path: '/Form', name: 'Form', component: Form },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/:catchAll(.*)', name: 'NotFound', component: Home } //Routers desconocidos
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router