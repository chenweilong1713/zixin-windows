<template>
  <div class="friend-links">
    <div
        v-for="item in links"
        :key="item.id"
        class="link-card"
        @click="openLink(item.url)"
    >
      <img class="avatar" :src="item.avatar" alt="avatar" />

      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="desc">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FriendLink {
  id: number
  name: string
  description: string
  avatar: string
  url: string
}

/**
 * 模拟数据
 * 后期可直接替换为接口请求结果
 */
const links: FriendLink[] = [
  {
    id: 1,
    name: '龙的技术博客',
    description: '记录前端、后端、Docker 与折腾日常',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    url: 'https://example.com'
  },
  {
    id: 2,
    name: 'Vue 官方文档',
    description: '渐进式 JavaScript 框架',
    avatar: 'https://cn.vuejs.org/logo.svg',
    url: 'https://cn.vuejs.org'
  },
  {
    id: 3,
    name: 'MDN Web Docs',
    description: '最权威的 Web 技术文档',
    avatar: 'https://developer.mozilla.org/static/img/favicon144.png',
    url: 'https://developer.mozilla.org'
  }
]

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.friend-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* 卡片 */
.link-card {
  display: flex;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #eee;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #ddd;
}

/* 头像 */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 12px;
}

/* 信息区 */
.info {
  flex: 1;
  overflow: hidden;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.desc {
  margin-top: 4px;
  font-size: 13px;
  color: #666;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
