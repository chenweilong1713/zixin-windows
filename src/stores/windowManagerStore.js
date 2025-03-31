// stores/windowManager.js
import { defineStore } from 'pinia';
import { ref, computed, markRaw } from 'vue';

export const useWindowManagerStore = defineStore('windowManager', () => {
    // 状态（相当于原来的 ref）
    const windows = ref([]);
    let maxZIndex = 1;

    // 计算属性（相当于原来的 computed）
    const activeWindows = computed(() => {
        // const filtered = windows.value.filter(w => w.visible);
        // console.log('当前所有窗口:', windows.value);
        // console.log('可见窗口:', filtered);
        return windows;
    });

    // 方法（相当于原来的函数）
    const updateMaxZIndex = () => {
        maxZIndex = windows.value.reduce((max, window) =>
            Math.max(max, window.zIndex || 1), 1);
    };

    const bringToFront = (windowId) => {
        updateMaxZIndex();
        const window = windows.value.find(w => w.id === windowId);
        if (window) window.zIndex = maxZIndex + 1;
    };

    const openWindow = (component, componentProps = {}, title = '新窗口') => {
        console.log('调用 openWindow', component, componentProps, title);
        // 检查是否已存在相同窗口
        const existingWindow = windows.value.find(w =>
            w.component === component &&
            JSON.stringify(w.componentProps) === JSON.stringify(componentProps)
        );

        if (existingWindow) {
            bringToFront(existingWindow.id);
            existingWindow.visible = true;
            return existingWindow.id;
        }

        // 创建新窗口
        const windowId = `window_${Date.now()}`;
        windows.value.push({
            id: windowId,
            component: markRaw(component), // 使用 markRaw 避免响应式代理
            componentProps,
            title,
            visible: true,
            position: {
                x: 300 + (windows.value.length * 30),
                y: 50 + (windows.value.length * 30)
            },
            size: { width: 1100, height: 750 },
            zIndex: maxZIndex + 1
        });
        console.log('新窗口数据:', windows.value); // 检查是否成功添加到数组
        return windowId;
    };

    const closeWindow = (windowId) => {
        windows.value = windows.value.filter(w => w.id !== windowId);
    };

    return {
        windows,
        activeWindows,
        openWindow,
        closeWindow,
        bringToFront
    };
});