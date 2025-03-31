<template>
  <div class="icon-grid">
    <DesktopMenu
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Hello, {},'hello')"
    />
    <DesktopMenu
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Word, {},'word')"
    />


  </div>
  <!-- 动态渲染所有活动窗口 -->
  <template v-for="window in activeWindows" :key="window.id">
    <DraggableModal
        v-model:visible="window.visible"
        :title="window.title"
        :window-id="window.id"
        :z-index="window.zIndex"
        :component="window.component"
        :initial-position="window.position"
        :initial-size="window.size"
        :component-props="window.componentProps"
        @close="closeWindow(window.id)"
        @bring-to-front="args => bringToFront(args)"
    />
  </template>

  <TabBar/>
</template>

<script setup>
import TabBar from "@/components/desktop/TabBar.vue";
import DesktopMenu from "@/components/desktop/DesktopMenu.vue";
import DraggableModal from '@/components/desktop/DraggableModal.vue'
import useWindowManager from '@/util/useWindowManager.js'

const {windows, activeWindows, openWindow, closeWindow,bringToFront} = useWindowManager()

import Hello from "@/views/Hello.vue";
import Word from "@/views/Word.vue";
// 示例：打开不同路由的窗口
// const openUserManagement = () => {
//   openWindow('/user-management', '用户管理')
// }
//
// const openSettings = () => {
//   openWindow('/settings', '系统设置')
// }
</script>

<style scoped>
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  gap: 16px;
  padding: 20px;
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
}
</style>