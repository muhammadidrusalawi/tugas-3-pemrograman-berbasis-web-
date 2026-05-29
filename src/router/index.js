import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '../stores/auth.store';
import Login from '../views/Login.vue';
import MainLayout from '../layouts/MainLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import Tracking from '../views/Tracking.vue';
import Stock from '../views/Stock.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/dashboard',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard,
      },
    ],
  },

  {
    path: '/tracking',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: '',
        name: 'tracking',
        component: Tracking,
      },
    ],
  },

  {
    path: '/stock',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: '',
        name: 'stock',
        component: Stock,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const isAuthenticated = !!authStore.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login';
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/dashboard';
  }
});
