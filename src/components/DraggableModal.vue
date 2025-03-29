<template>
  <div
      class="draggable-modal"
      :style="modalStyle"
      v-show="visible"
      @mousedown="startDrag"
  >
    <div class="modal-header" @mousedown.stop>
      <h3>{{ title }}</h3>
      <button class="close-btn" @click="close">×</button>
    </div>
    <div class="modal-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  },
  initialPosition: {
    type: Object,
    default: () => ({ x: 100, y: 100 })
  }
})

const emit = defineEmits(['update:visible'])

const route = useRoute()
const position = ref({ ...props.initialPosition })
const isDragging = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })

const modalStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`
}))

watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 每次打开时重置位置
    position.value = { ...props.initialPosition }
  }
})

const startDrag = (e) => {
  isDragging.value = true
  dragStartPos.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return

  position.value = {
    x: e.clientX - dragStartPos.value.x,
    y: e.clientY - dragStartPos.value.y
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const close = () => {
  emit('update:visible', false)
}
</script>

<style scoped>
.draggable-modal {
  position: fixed;
  width: 600px;
  min-height: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  cursor: move;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 8px;
}

.close-btn:hover {
  color: #f56c6c;
}

.modal-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>