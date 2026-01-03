<template>
  <div class="profile-card">
    <!-- 左侧头像 -->
    <div class="avatar">
      <img :src="profile.avatar" alt="avatar" />
    </div>

    <!-- 右侧信息 -->
    <div class="info">
      <div class="header">
        <span class="nickname">{{ profile.nickname }}</span>
        <span class="job">{{ profile.job }}</span>
      </div>

      <div class="meta">
        <span>📍 {{ profile.city }}</span>
        <span>📧 {{ profile.email }}</span>
      </div>

      <div class="signature">
        {{ profile.signature }}
      </div>

      <!-- 可扩展信息 -->
      <div class="extra">
        <span>💻 {{ profile.skills.join(' / ') }}</span>
        <span class="github-link">
          <a :href="profile.github" target="_blank" rel="noopener noreferrer">
            <span class="github-icon">⭐</span> GitHub: {{ profile.github }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserProfile {
  avatar: string
  nickname: string
  job: string
  city: string
  email: string
  signature: string
  skills: string[]
  github: string
}

/**
 * 模拟数据（后期可替换为接口）
 */
const profile: UserProfile = {
  avatar: 'https://avatars.githubusercontent.com/u/48249891?v=4',
  nickname: '实习两年半',
  job: 'JAVA / 全栈开发工程师',
  city: '中国 · 宿迁',
  email: 'chen@unuuc.cn',
  signature: '基础不牢，地动山摇。',
  skills: ['JAVA', 'SpringBoot', 'MYSQL'],
  github: 'https://github.com/chenweilong1713'
}
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* 头像 */
.avatar img {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
  transition: transform 0.3s ease;
}

.avatar img:hover {
  transform: translateY(-5px);
}

/* 信息区域 */
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 头部 */
.header {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.nickname {
  font-size: 20px;
  font-weight: 600;
  color: #222;
}

.job {
  font-size: 14px;
  color: #666;
}

/* 基础信息 */
.meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #555;
}

/* 个性签名 */
.signature {
  font-size: 14px;
  color: #333;
}

/* 扩展信息 */
.extra {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #777;
}

.github-link a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s ease;
}

.github-link a:hover {
  color: #4078c0;
  text-decoration: none;
}
</style>
