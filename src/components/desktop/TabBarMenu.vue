<template>
  <div class="software-icon"
       @click="handleClick">
    <div class="icon-container">
      <el-tooltip
          effect="dark"
          :content="name"
          :offset="30"
          placement="top"
      >
        <!-- 使用图标组件或图片 -->
        <component
            :is="iconComponent"
            v-if="iconComponent"
            class="icon"
        />
        <img
            v-else-if="iconImage"
            :src="iconImage"
            :alt="name"
            class="icon"
        />
        <div v-else class="default-icon">
          {{ defaultIconText }}
        </div>
      </el-tooltip>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  // 使用组件形式的图标（如从图标库导入）
  iconComponent: {
    type: [Object, String],
    default: null
  },
  // 使用图片形式的图标
  iconImage: {
    type: String,
    default: ''
  },
  // 默认图标显示的文字（当没有提供图标时）
  defaultIconText: {
    type: String,
    default: 'App'
  },
  // 图标大小
  size: {
    type: [String, Number],
    default: 48
  }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.software-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
  transition: all 0.2s ease;
}

.software-icon:hover {
  transform: translateY(-4px);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 20%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
  margin-bottom: 8px;
  width: 45px;
  height: 45px;
  aspect-ratio: 1/1; /* 保持正方形 */
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.default-icon {
  font-weight: bold;
  color: #4a6cf7;
}

.icon-name {
  font-size: 12px;
  text-align: center;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>