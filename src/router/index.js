import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home/Home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:{
        path: 'page',
        component: () => import('@/views/Page.vue')
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
