<template>
  <div id="tabBar">
    <div v-for="window in windows">
        <TabBarMenu v-if="!window.visible"
                    :name="window.title"
                    default-icon-text="NA"
                    @click="restoreWindow(window.id)"
                    size="40"
        />
    </div>
  </div>
</template>

<script setup>
import TabBarMenu from "@/components/desktop/TabBarMenu.vue";
import { useWindowManagerStore } from '@/stores/windowManagerStore.js';
const windowManager = useWindowManagerStore();
const { windows,openWindow,hideWindow,restoreWindow,hiddenWindows, closeWindow, bringToFront} = windowManager;

</script>

<style scoped>
#tabBar {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  height: 65px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: inline-flex;
  padding: 0 5px;
  align-items: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影 */
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>