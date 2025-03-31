<template>
  <div class="icon-grid">
    <DesktopMenu
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Hello, {}, '用户管理')"
    />
    <DesktopMenu
        text="文档编辑"
        default-text="W"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
        @click="openWindow(Word, {}, '文档编辑')"
    />
<!--    <button @click="console.log(activeWindows)">获取激活的信息</button>-->
<!--    <button @click="console.log(windows)">获取所有存储的窗口</button>-->

<!--    <template v-for="item in windows">-->
<!--      <button v-if="!item.visible" @click="restoreWindow(item.id)">打开{{ item.title }}</button>-->

<!--    </template>-->

  </div>

  <!-- 动态渲染窗口 -->
  <template v-for="window in windows" :key="window.id">
    <keep-alive>
      <DraggableModal
          v-if="window.visible"
          v-model:visible="window.visible"
          :title="window.title"
          :window-id="window.id"
          :z-index="window.zIndex"
          :component="window.component"
          :initial-position="window.position"
          :initial-size="window.size"
          :component-props="window.componentProps"
          @hide-window="hideWindow(window.id)"
          @close="closeWindow(window.id)"
          @bring-to-front="bringToFront(window.id)"
      />
    </keep-alive>

  </template>

  <TabBar v-if="windows.filter(e=>!e.visible).length >0"/>
</template>

<script setup>
import {useWindowManagerStore} from '@/stores/windowManagerStore.js';
import DesktopMenu from "@/components/desktop/DesktopMenu.vue";
import DraggableModal from '@/components/desktop/DraggableModal.vue';
import TabBar from "@/components/desktop/TabBar.vue";
import Hello from "@/views/Hello.vue";
import Word from "@/views/Word.vue";

const windowManager = useWindowManagerStore();
const {windows, openWindow, hideWindow, restoreWindow, hiddenWindows, closeWindow, bringToFront} = windowManager;


</script>

<style scoped>
/* 原有样式保持不变 */
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