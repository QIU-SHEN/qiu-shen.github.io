import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/About/aboutMe',
      component: () => import('../views/aboutMe.vue')
    },
    {
      path: '/About/aboutSite',
      component: () => import('../views/aboutSite.vue')
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
