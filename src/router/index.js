import { useUserAuthStore } from '@/store/userAuth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard', auth: true },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          auth: true
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
          auth: true
        },
        {
          path: 'company-packages',
          component: () => import('../pages/company-packages.vue'),
          auth: true
        },
        {
            path: 'services',
            component: () => import('../pages/services.vue'),
            auth: true
        },
        {
            path: 'expiring-services',
            component: () => import('../pages/expiring-services.vue'),
            auth: true
        },
        {
            path: 'expired-services',
            component: () => import('../pages/expired-services.vue'),
            auth: true
        },
        {
            path: 'clients',
            component: () => import('../pages/clients.vue'),
            auth: true
        },
        {
            path: 'client/:clientId/packages',
            component: () => import('../pages/client-packages.vue'),
            props: true
          },
        {
          path: 'company-package/:packageId/services',
          component: () => import('../pages/company-package-services.vue'),
          props: true
        },
        {
          path: 'package/:packageId/services',
          component: () => import('../pages/package-services.vue'),
          props: true
        },
        {
          path: 'price-lists',
          component: () => import('../pages/price-lists.vue'),
          props: true
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
          auth: false
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
          auth: false
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
          auth: false
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
    console.log('entering ', to.path);
  const userAuth = useUserAuthStore();
  const publicRoutes = ['/login', '/register'];
  const authRequired = !publicRoutes.includes(to.path);

  console.log({ authRequired, loggedIn: userAuth.loggedIn})
  if(authRequired && !userAuth.loggedIn) {
    next('/login');
  } else if(to.path == '/login' && userAuth.loggedIn) {
    next('/');
  }else{
    next();
  }
// next();
})

export default router
