<template>
  <div
      class="draggable-window"
      ref="windowRef"
      :style="{
      left: position.x + 'px',
      top: position.y + 'px',
      width: size.width + 'px',
      height: size.height + 'px',
      zIndex: zIndex,
      display: visible ? 'flex' : 'none'
    }"
      @mousedown="bringToFront"
  >
    <div class="window-header" @mousedown="startDrag">
      <span class="window-title">{{ title }}</span>
      <div class="window-controls">
        <button @click="minimize" class="control-btn">－</button>
        <button @click="maximize" class="control-btn">□</button>
        <button @click="closeWindow" class="control-btn close-btn">×</button>
      </div>
    </div>
    <div class="window-content">
      <!-- 动态组件容器 -->
      <keep-alive>
        <component :is="component" v-bind="componentProps" />
      </keep-alive>
    </div>
    <div class="window-resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '可拖拽窗口'
  },
  visible: {
    type: Boolean,
    default: false
  },
  windowId: {
    type: String,
    required: true
  },
  initialPosition: {
    type: Object,
    default: () => ({ x: 300, y: 120 })
  },
  initialSize: {
    type: Object,
    default: () => ({ width: 900, height: 500 })
  },
  component: {
    type: [Object, String],
    required: true
  },
  componentProps: {
    type: Object,
    default: () => ({})
  },
  zIndex: {
    type: Number,
    default: 1
  }
})


const emit = defineEmits(['update:visible', 'close','bring-to-front'])

const windowRef = ref(null)
const position = reactive({ ...props.initialPosition })
const size = reactive({ ...props.initialSize })
const isDragging = ref(false)
const isResizing = ref(false)
const startPos = reactive({ x: 0, y: 0 })
// const zIndex = ref()
// let maxZIndex = 1


// 最小化状态
const isMinimized = ref(false)
const originalSize = reactive({ ...props.initialSize })

// 最大化状态
const isMaximized = ref(false)
const originalPosition = reactive({ ...props.initialPosition })

// 计算最大zIndex
// const updateMaxZIndex = () => {
//   const windows = document.querySelectorAll('.draggable-window')
//   maxZIndex = Array.from(windows).reduce((max, window) => {
//     const z = parseInt(window.style.zIndex) || 1
//     return Math.max(max, z)
//   }, 1)
// }

// 置顶窗口
const bringToFront = () => {
  // updateMaxZIndex()
  // zIndex.value = maxZIndex + 1

  emit('bring-to-front', false)
}

// 开始拖拽
const startDrag = (e) => {
  if (isMaximized.value) return

  isDragging.value = true
  startPos.x = e.clientX - position.x
  startPos.y = e.clientY - position.y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  e.preventDefault()
}

// 拖拽中
const onDrag = (e) => {
  if (!isDragging.value) return

  position.x = e.clientX - startPos.x
  position.y = e.clientY - startPos.y

  // 限制在视口内
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  position.x = Math.max(0, Math.min(position.x, windowWidth - size.width))
  position.y = Math.max(0, Math.min(position.y, windowHeight - size.height))
}

// 停止拖拽
const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 开始调整大小
const startResize = (e) => {
  if (isMaximized.value) return

  isResizing.value = true
  startPos.x = e.clientX
  startPos.y = e.clientY

  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

// 调整大小中
const onResize = (e) => {
  if (!isResizing.value) return

  const deltaX = e.clientX - startPos.x
  const deltaY = e.clientY - startPos.y

  const newWidth = size.width + deltaX
  const newHeight = size.height + deltaY

  // 限制最小和最大尺寸
  size.width = Math.max(300, Math.min(newWidth, 1200))
  size.height = Math.max(200, Math.min(newHeight, 800))

  // 更新起始位置
  startPos.x = e.clientX
  startPos.y = e.clientY

  // 限制在视口内
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (position.x + size.width > windowWidth) {
    size.width = windowWidth - position.x
  }

  if (position.y + size.height > windowHeight) {
    size.height = windowHeight - position.y
  }
}

// 停止调整大小
const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// 最小化
const minimize = () => {
  if (isMinimized.value) {
    // 恢复
    size.width = originalSize.width
    size.height = originalSize.height
  } else {
    // 最小化
    originalSize.width = size.width
    originalSize.height = size.height
    size.width = 300
    size.height = 40 // 只保留标题栏高度
  }

  isMinimized.value = !isMinimized.value
}

// 最大化/恢复
const maximize = () => {
  if (isMaximized.value) {
    // 恢复
    position.x = originalPosition.x
    position.y = originalPosition.y
    size.width = originalSize.width
    size.height = originalSize.height
  } else {
    // 最大化
    originalPosition.x = position.x
    originalPosition.y = position.y
    originalSize.width = size.width
    originalSize.height = size.height

    position.x = 0
    position.y = 0
    size.width = window.innerWidth
    size.height = window.innerHeight
  }

  isMaximized.value = !isMaximized.value
}

// 关闭窗口
const closeWindow = () => {
  emit('update:visible', false)
  emit('close', props.windowId)
}

// 组件挂载时更新最大zIndex
onMounted(() => {
  // updateMaxZIndex()
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<style scoped>
.draggable-window {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.window-header {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  cursor: move;
  display: flex;
  height: 35px;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.window-title {
  font-weight: bold;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: #e0e0e0;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: #d0d0d0;
}

.close-btn:hover {
  background: #ff6b6b;
  color: white;
}

.window-content {
  flex: 1;
  padding: 12px;
  overflow: auto;
}

.window-resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, #ccc 50%);
}
</style>