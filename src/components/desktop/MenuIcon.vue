<template>
  <div
      class="flex-icon-container"
      :style="{
      width: size + 'px',
      height: parseInt(size) + (showText ? 15 : 0) + 'px',
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
            v-else-if="iconSrc || iconImage"
            :src="iconSrc || iconImage"
            :alt="text || name"
            :style="{
              backgroundColor: defaultIconBgColor,
              color: defaultIconColor,
              fontSize: iconSize
            }"
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
          {{ defaultText || defaultIconText }}
        </div>
      </slot>

    </div>

    <div
        v-if="showText"
        class="icon-text"
        :style="{
        color: textColor,
        fontSize: textSize,
        marginTop: textGap
      }"
    >
      {{ text || name }}
    </div>
  </div>
</template>

<script setup>
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
  iconImage: {
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
    default: 'A'
  },
  defaultIconText: {
    type: String,
    default: 'App'
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
    default: ''
  },
  name: {
    type: String,
    default: ''
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
    default: 50
  },
  margin: {
    type: String,
    default: '0 8px'
  },
  textGap: {
    type: String,
    default: '4px'
  },

  // 功能开关
  showText: {
    type: Boolean,
    default: true
  },
  // 悬停效果
  hoverEffect: {
    type: Boolean,
    default: true
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
  transform: v-bind('hoverEffect ? "translateY(-4px)" : "none"');
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1; /* 保持正方形 */
  background: v-bind('defaultIconBgColor');
  border-radius: 20%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  border-radius: 20%;
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
  line-height: 1.5;
  font-size: 12px;
  font-weight: bold;
}
</style>