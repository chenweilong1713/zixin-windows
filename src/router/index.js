import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home/Home.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // 添加 meta 标识这是窗口内容
    //   meta: { isWindow: true },
    //   component: () => import('../views/AboutView.vue')
    // },
  ],
})

export default router
