<template>
  <div id="tabBar">

    <!-- TabBar默认  -->
      <MenuIcon
          name="设置"
          size="40"
          :show-text="false"
          :icon-component="Setting"
      />
      <MenuIcon
          name="启动台"
          size="40"
          :show-text="false"
          :icon-component="ApplicationListIcon"
      />

    <!--  在TabBar中显示所有被隐藏的窗体  -->
    <template v-for="window in windows">
        <MenuIcon v-if="!window.visible"
                    :name="window.title"
                    default-icon-text="A"
                     :show-text="false"
                    :icon-component="window.iconComponent"
                    @click="restoreWindow(window.id)"
                    size="40"
        />
    </template>
  </div>
</template>

<script setup>
import MenuIcon from "@/components/desktop/MenuIcon.vue";
import { useWindowManagerStore } from '@/stores/windowManagerStore.js';
import Setting from "@/components/icon/Setting.vue";
import ApplicationListIcon from "@/components/icon/ApplicationList.vue";
const windowManager = useWindowManagerStore();
const { windows,hideWindow,restoreWindow,bringToFront} = windowManager;

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
</style>