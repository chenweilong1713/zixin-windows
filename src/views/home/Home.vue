<template>
  <div class="icon-grid">
    <FlexIcon
        v-for="item in 15"
        :key="item"
        text="用户管理"
        default-text="U"
        default-icon-bg-color="#e3f2fd"
        default-icon-color="#1976d2"
        size="50"
    />
    <TabBar />
    <button @click="openModal('page1')">Open Page 1</button>
    <DraggableModal
        v-model:visible="modalVisible"
        :title="modalTitle"
    >
      <router-view />
    </DraggableModal>
  </div>
</template>

<script setup >
import TabBar from "@/components/TabBar.vue";
import FlexIcon from "@/components/FlexIcon.vue";
import DraggableModal from '@/components/DraggableModal.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'home' })

const router = useRouter()
const modalVisible = ref(false)
const currentModal = ref('')

const modalTitle = computed(() => {
  return currentModal.value === 'page1'
      ? 'Page 1 Title'
      : 'Page 2 Title'
})

const openModal = (page) => {
  currentModal.value = page
  router.push('/page')
  modalVisible.value = true
}
</script>

<style scoped>
.icon-grid {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  flex-direction: column; /* 主方向为垂直 */
  align-content: flex-start; /* 多列对齐方式 */
  max-height: 100vh;
  gap: 16px; /* 图标间距 */
  padding: 20px;
}
</style>