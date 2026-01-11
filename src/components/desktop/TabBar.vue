<template>
  <div id="tabBar">

    <!-- TabBar默认  -->
<!--      <MenuIcon-->
<!--          name="设置"-->
<!--          size="40"-->
<!--          :show-text="false"-->
<!--          :icon-component="Setting"-->
<!--          hover-direction="right"-->
<!--      />-->
<!--      <MenuIcon-->
<!--          name="启动台"-->
<!--          size="40"-->
<!--          :show-text="false"-->
<!--          :icon-component="ApplicationListIcon"-->
<!--          hover-direction="right"-->
<!--      />-->
    <div v-for="item in tabBarList" :key="item">
      <MenuIcon
          :name=item.name
          :size=item.size
          :show-text="false"
          :icon-component=item.icon
          @click="openWindow(item.component, item.componentProps, item.title, item.icon)"
          hover-direction="right"
      />
    </div>

    <!--  在TabBar中显示所有被隐藏的窗体  -->
    <template v-for="window in windows">
<!--  TODO: 这里需要判断打开的窗口是否从TaBar中打开的，如果是则在缩小的时候排除一下，不应该重复显示，还是给菜单添加提示，表示这已经打开了     -->
        <MenuIcon v-if="!window.visible"
                    :name="window.title"
                    default-icon-text="A"
                     :show-text="false"
                    :icon-component="window.iconComponent"
                    @click="restoreWindow(window.id)"
                    size="40"
                    hover-direction="right"
        />

    </template>
  </div>
</template>

<script setup>
import MenuIcon from "@/components/desktop/MenuIcon.vue";
import { useWindowManagerStore } from '@/stores/windowManagerStore.js';
import Setting from "@/components/icon/Setting.vue";
import ApplicationListIcon from "@/components/icon/ApplicationList.vue";
import MessageBoard from "@/views/applications/MessageBoard/index.vue";
import LiuYan from "@/components/icon/LiuYan.vue";
import FriendLinks from "@/views/applications/FriendLinks/index.vue"

import { ref, onMounted, onUnmounted } from 'vue'
const windowManager = useWindowManagerStore();
const { windows,openWindow,hideWindow,restoreWindow,bringToFront} = windowManager;

const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const tabBarList = ref([
  {
    name: '留言',
    icon: LiuYan,
    size: 40,
    showText: false,
    hoverDirection: 'right',
    title: '给我留言',
    component: MessageBoard,
    componentProps: {width: 600, height: 500, x:(windowWidth/2)-300,y:120}
  },
  {
    name: '友链',
    icon: LiuYan,
    size: 40,
    showText: false,
    hoverDirection: 'right',
    title: '友链(mock数据)',
    component: FriendLinks,
    componentProps: {width: 1200, height: 700}
  }
])

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
#tabBar {
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  width: 65px;
  height: auto;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影 */
}
#tabBar :deep(.flex-icon-container) {
  margin: 0 !important; /* 覆盖MenuIcon的默认margin */
}
</style>