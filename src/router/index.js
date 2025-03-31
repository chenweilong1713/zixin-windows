import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hello',
      name: 'hello',
      // 添加 meta 标识这是窗口内容
      component: () => import('../views/Hello.vue')
    },
  ],
})

export default router
