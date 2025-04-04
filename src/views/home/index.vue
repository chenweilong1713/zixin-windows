<template>
  <!-- 桌面图标 -->
  <div class="desktop-icon-grid">
    <MenuIcon
        text="小游戏"
        default-text="S"
        @click="openWindow(SnakeBall, {}, 'SnakeBall')"
    />
    <MenuIcon
        text="贪吃蛇"
        :icon-component="GameIcon"
        @click="openWindow(SnakeGame, {}, '贪吃蛇',GameIcon)"
    />
    <MenuIcon
        text="坦克大战"
        :icon-component="ArrowKeysIcon"
        @click="openWindow(Battlecity, {}, '坦克大战',ArrowKeysIcon)"
    />
  </div>

  <!-- 动态渲染窗口 -->
  <template v-for="window in windows" :key="window.id">
    <keep-alive>
      <DraggableModal
          v-show="window.visible"
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

  <TabBar />
</template>

<script setup>
import {useWindowManagerStore} from '@/stores/windowManagerStore.js';
import MenuIcon from "@/components/desktop/MenuIcon.vue";
import DraggableModal from '@/components/desktop/DraggableModal.vue';
import TabBar from "@/components/desktop/TabBar.vue";
import SnakeGame from "@/apps/snake/SnakeGame.vue";
import GameIcon from "@/components/icon/Game.vue"
import SnakeBall from "@/apps/snakbBall/SnakeBall.vue";
import ArrowKeysIcon from "@/components/icon/ArrowKeys.vue";
import Battlecity from "@/apps/battlecity/Battlecity.vue";


const windowManager = useWindowManagerStore();
const {windows, openWindow, hideWindow, closeWindow, bringToFront} = windowManager;


</script>

<style scoped>
/* 原有样式保持不变 */
.desktop-icon-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  gap: 16px;
  padding: 20px;
  background-image: linear-gradient(-225deg, #7742B2 0%, #F180FF 52%, #FD8BD9 100%);
}
</style>