// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Login from '@/views/pages/auth/Login.vue';
import store from '@/store'; 

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: { requiresAuth: true } 
            }
        ]
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes 
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.getters.isAuthenticated;
    const isGoogleSignIn = store.getters.isGoogleSignIn;

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' }); 
    } else if (to.name === 'login' && isAuthenticated && isGoogleSignIn) {
        next({ name: 'dashboard' });
    } else {
        next(); 
    }
});

export default router;
