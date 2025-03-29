<template>
  <div
      class="flex-icon-container"
      :style="{
      width: size + 'px',
      margin: margin
    }"
      @click="$emit('click')"
  >
    <div class="icon-wrapper">
      <!-- 支持多种图标形式 -->
      <slot name="icon">
        <component
            v-if="iconComponent"
            :is="iconComponent"
            class="icon"
            :style="{ color: iconColor, fontSize: iconSize }"
        />
        <img
            v-else-if="iconSrc"
            :src="iconSrc"
            :alt="text"
            class="icon"
        />
        <div
            v-else
            class="default-icon"
            :style="{
            backgroundColor: defaultIconBgColor,
            color: defaultIconColor,
            fontSize: iconSize
          }"
        >
          {{ defaultText }}
        </div>
      </slot>
    </div>

    <div
        class="icon-text"
        :style="{
        color: textColor,
        fontSize: textSize,
        marginTop: textGap
      }"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup >
defineProps({
  // 图标属性
  iconComponent: {
    type: [Object, String],
    default: null
  },
  iconSrc: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: '#333'
  },
  iconSize: {
    type: String,
    default: '24px'
  },

  // 默认图标属性
  defaultText: {
    type: String,
    default: 'Icon'
  },
  defaultIconBgColor: {
    type: String,
    default: '#f0f0f0'
  },
  defaultIconColor: {
    type: String,
    default: '#666'
  },

  // 文字属性
  text: {
    type: String,
    default: '图标'
  },
  textColor: {
    type: String,
    default: '#333'
  },
  textSize: {
    type: String,
    default: '12px'
  },

  // 布局属性
  size: {
    type: [Number, String],
    default: 64
  },
  margin: {
    type: String,
    default: '0 8px'
  },
  textGap: {
    type: String,
    default: '4px'
  }
});

defineEmits(['click']);
</script>

<style scoped>
.flex-icon-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.flex-icon-container:hover {
  transform: translateY(-10px);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1; /* 保持正方形 */
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.default-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  font-weight: 500;
}

.icon-text {
  text-align: center;
  word-break: break-word;
  width: 100%;
  line-height: 1.2;
}
</style>