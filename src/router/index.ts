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
            path: '/WriteItDown',
            redirect: '/home',
        },
        {
            path: '/WriteItDown/home',
            name: 'Home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/WriteItDown/register',
            name: 'register',
            component: () => import('@/views/Auth/RegisterView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/WriteItDown/login',
            name: 'Login',
            component: () => import('@/views/Auth/LoginView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/WriteItDown/verify-email',
            name: 'VerifyEmail',
            component: () => import('@/views/Auth/VerifyEmailView.vue')
        },
        {
            path: '/WriteItDown/forgot-password',
            name: 'forgot-password',
            component: () => import('@/views/Auth/ForgotPasswordView.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: 'WriteItDown/auth/action/',
            name: 'auth-action',
            component: () => import('@/views/Auth/AuthActionView.vue'),
        },
        {
            path: 'WriteItDown/auth/action/verified-email',
            name: 'verified-email',
            component: () => import('@/views/Auth/VerifiedEmailAction.vue'),
        },
        {
            path: 'WriteItDown/auth/action/reset-password',
            name: 'reset-password',
            component: () => import('@/views/Auth/ResetPasswordAction.vue'),
            meta: {
                requiresUnAuth: true,
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
        // {
        //     path: '/',
        //     redirect: '/home',
        // },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: HomeView,
        //     meta: {
        //         requiresAuth: true,
        //     }
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: () => import('@/views/Auth/RegisterView.vue'),
        //     meta: {
        //         requiresUnAuth: true,
        //     }
        // },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: () => import('@/views/Auth/LoginView.vue'),
        //     meta: {
        //         requiresUnAuth: true,
        //     }
        // },
        // {
        //     path: '/verify-email',
        //     name: 'verify-email',
        //     component: () => import('@/views/Auth/VerifyEmailView.vue')
        // },
        // {
        //     path: '/forgot-password',
        //     name: 'forgot-password',
        //     component: () => import('@/views/Auth/ForgotPasswordView.vue'),
        //     meta: {
        //         requiresUnAuth: true,
        //     }
        // },
        // {
        //     path: '/auth/action/',
        //     name: 'auth-action',
        //     component: () => import('@/views/Auth/AuthActionView.vue'),
        // },
        // {
        //     path: '/auth/action/verified-email',
        //     name: 'verified-email',
        //     component: () => import('@/views/Auth/VerifiedEmailAction.vue'),
        // },
        // {
        //     path: '/auth/action/reset-password',
        //     name: 'reset-password',
        //     component: () => import('@/views/Auth/ResetPasswordAction.vue'),
        //     meta: {
        //         requiresUnAuth: true,
        //     }
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: () => import('@/views/NotFoundView.vue'),
        // }
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
