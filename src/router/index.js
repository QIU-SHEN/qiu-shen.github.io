import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const createHistory = import.meta.env.VITE_USE_HASH_ROUTER === 'true'
  ? createWebHashHistory
  : createWebHistory

const router = createRouter({
  history: createHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/Home',
      component: Home
    },
    {
      path: '/About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/Project',
      component: () => import('../views/Project.vue')
    },
    {
      path: '/Project/ai-sales-coach',
      component: () => import('../views/AiSalesCoach.vue')
    },
    {
      path: '/Project/car-rental',
      component: () => import('../views/CarRental.vue')
    },
    {
      path: '/Project/ai-customer-lifecycle',
      component: () => import('../views/AiCustomerLifecycle.vue')
    },
    {
      path: '/Notes',
      component: () => import('../views/Notes.vue')
    },
    {
      path: '/Notes/:id',
      component: () => import('../views/NoteDetail.vue')
    },
    {
      path: '/Join',
      component: () => import('../views/join.vue')
    },
    {
      path: '/join/joinUs',
      component: () => import('../views/joinUs.vue')
    },
    {
      path: '/Music',
      component: () => import('../views/music.vue')
    },
    {
        path:'/:pathMatch(.*)*',
        component:()=>import('../views/404.vue'),
    }
  ],
})

export default router
