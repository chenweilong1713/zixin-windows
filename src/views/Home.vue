<template>
  <div class="icon-grid">
    <FlexIcon
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Hello, {},'hello')"
    />
    <FlexIcon
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Word, {},'word')"
    />

    <!-- 动态渲染所有活动窗口 -->
    <template v-for="window in activeWindows" :key="window.id">
      <DraggableModal
          v-model:visible="window.visible"
          :title="window.title"
          :window-id="window.id"
          :component="window.component"
          :component-props="window.componentProps"
          @close="closeWindow(window.id)"
      />
    </template>

    <TabBar/>
  </div>
</template>

<script setup>
import TabBar from "@/components/TabBar.vue";
import FlexIcon from "@/components/FlexIcon.vue";
import DraggableModal from '@/components/DraggableModal.vue'
import useWindowManager from '@/util/useWindowManager.js'

const {windows, activeWindows, openWindow, closeWindow} = useWindowManager()
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
  max-height: 100vh;
  gap: 16px;
  padding: 20px;
}
</style>