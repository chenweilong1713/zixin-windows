<template>
  <div class="desktop">
    <!-- 弹幕组件 - 浮动在内容上方 -->
    <div class="barrage-overlay">
      <Barrage />
    </div>

    <!-- 个人信息区域 -->
    <div class="my-info">
      <!--   个人信息   -->
      <UserProfileCard />
      <!--   github统计   -->
      <GithubContributionGraph />
      <!--   项目信息   -->
      <GithubRepositories />
<!--      <div class="split_title">小游戏</div>-->
<!--      <div class="desktop-flex">-->
<!--&lt;!&ndash;        <MenuIcon&ndash;&gt;-->
<!--&lt;!&ndash;            text="Ball"&ndash;&gt;-->
<!--&lt;!&ndash;            default-text="S"&ndash;&gt;-->
<!--&lt;!&ndash;            @click="openWindow(SnakeBall, {}, 'SnakeBall')"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--        <MenuIcon-->
<!--            text="贪吃蛇"-->
<!--            :icon-component="GameIcon"-->
<!--            @click="openWindow(SnakeGame, {}, '贪吃蛇',GameIcon)"-->
<!--        />-->
<!--        <MenuIcon-->
<!--            text="坦克大战"-->
<!--            :icon-component="ArrowKeysIcon"-->
<!--            @click="openWindow(Battlecity, {}, '坦克大战',ArrowKeysIcon)"-->
<!--        />-->
<!--      </div>-->
    </div>

    <DraggableSticker
        v-for="sticker in store.stickers"
        :key="sticker.id"
        :sticker="sticker"
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
import ArrowKeysIcon from "@/components/icon/ArrowKeys.vue";
import Battlecity from "@/apps/battlecity/Battlecity.vue";
import GithubContributionGraph from "@/components/GithubContributionGraph.vue";
import GithubRepositories from "@/components/GithubRepositories.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import { useStickerManagerStore } from '@/stores/stickerManagerStore.js'
import DraggableSticker from '@/components/DraggableSticker.vue'
import {onMounted} from "vue";
import Barrage from "@/components/Barrage.vue";

const store = useStickerManagerStore()

const windowManager = useWindowManagerStore();
const {windows, openWindow, hideWindow, closeWindow, bringToFront} = windowManager;


onMounted(() => {
  if (store.stickers.length === 0) {
    store.createSticker('社交', [
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        url: 'https://github.com/chenweilong1713'
      },
      {
        name: 'bilibili',
        icon: '@/assets/img/bilibili.png',
        url: 'https://github.com/chenweilong1713'
      }
    ])
  }
})

</script>

<style scoped>
/* 原有样式保持不变*/
.desktop {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 16px;
  /* background-image: linear-gradient(-225deg, #7742B2 0%, #F180FF 52%, #FD8BD9 100%); */
  background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
  position: relative; /* 为浮动弹幕提供定位上下文 */
}

.barrage-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 使用视口高度确保弹幕容器有足够空间 */
  pointer-events: none; /* 确保弹幕不阻挡下方元素的交互 */
  z-index: 999; /* 确保弹幕在其他内容上方 */
}

.desktop-flex {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-start;
  margin-left: -5px;
}
.my-info{
  margin: 12vh auto 0;
  max-width: 900px;
}
.split_title{
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
}

.my-info > :not(:first-child) {
  margin-top: 20px;
}



</style>