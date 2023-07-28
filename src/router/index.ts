import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LandingView from "@/views/LandingView.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import type {User} from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: LandingView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Auth/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Auth/LoginView.vue')
        },
        {
            path: '/verify-email',
            name: 'verify-email',
            component: () => import('@/views/Auth/VerifyEmailView.vue')
        },
        {
            path: '/auth/action',
            name: 'auth-action',
            component: () => import('@/views/Auth/AuthActionView.vue'),
        },
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

router.beforeEach(async (to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        const user: User = await getCurrentUser() as User;
        if(!user){
            next('/login');
        }
        else if(user.emailVerified) {
            next();
        }else if(!user.emailVerified) {
            next('/verify-email');
        }
    }else{
        next();
    }
});

export default router
