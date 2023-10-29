import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LandingView from "@/views/LandingView.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import type {User} from "firebase/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'landing',
        //     component: LandingView,
        // },

        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Auth/RegisterView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Auth/LoginView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/verify-email',
            name: 'VerifyEmail',
            component: () => import('@/views/Auth/VerifyEmailView.vue')
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: () => import('@/views/Auth/ForgotPasswordView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/auth/action/',
            name: 'AuthAction',
            component: () => import('@/views/Auth/AuthActionView.vue'),
        },
        {
            path: '/auth/action/verified-email',
            name: 'VerifiedEmail',
            component: () => import('@/views/Auth/VerifiedEmailAction.vue'),
        },
        {
            path: '/auth/action/reset-password',
            name: 'ResetPassword',
            component: () => import('@/views/Auth/ResetPasswordAction.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/NotFoundView.vue'),
        }
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
        else if(user.emailVerified || user.providerData[0].providerId === "github.com") { // github check so that it doesnt require email verification on login, this check will be skipped anyway because the email will be verified after a few seconds on cloud functions
            next();
        }else if(!user.emailVerified) {
            next('/verify-email');
        }
    }else if(to.matched.some(record => record.meta.requiresUnAuth)) {
        const user: User = await getCurrentUser() as User;
        if(user){
            next('/home');
        }else{
            next();
        }
    }
    else if(to.path === '/auth/action'){
        if(to.query.mode === 'resetPassword') {
            next({
                path: '/auth/action/reset-password',
                query: to.query
            });
        }else if(to.query.mode === 'verifyEmail') {
            next({
                path: '/auth/action/verified-email',
                query: to.query
            });
        }
    }else{
        next();
    }
});

export default router
