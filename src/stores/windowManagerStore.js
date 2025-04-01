import { defineStore } from 'pinia';
import { ref, markRaw } from 'vue';

export const useWindowManagerStore = defineStore('windowManager', () => {
    // 状态
    const windows = ref([]);
    const hiddenWindows = ref([]); // 存储隐藏的窗口
    let maxZIndex = 1;

    // 方法
    const updateMaxZIndex = () => {
        maxZIndex = windows.value.reduce((max, window) =>
            Math.max(max, window.zIndex || 1), 1);
    };

    // 置顶窗口
    const bringToFront = (windowId) => {
        updateMaxZIndex();
        const window = windows.value.find(w => w.id === windowId);
        if (window) {
            window.zIndex = maxZIndex + 1;
        }
    };

    // 隐藏窗口（从windows移到hiddenWindows）
    const hideWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        windows.value[index].visible = false
        // if (index !== -1) {
        //     const [hiddenWindow] = windows.value.splice(index, 1);
        //     hiddenWindows.value.push(hiddenWindow);
        //     console.log('窗口已隐藏:', windowId);
        // }
    };

    // 恢复窗口（从hiddenWindows移回windows）
    const restoreWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        windows.value[index].visible = true
        bringToFront(windows.value[index].id);
        // if (index !== -1) {
        //     const [restoredWindow] = hiddenWindows.value.splice(index, 1);
        //     windows.value.push(restoredWindow);
        //     bringToFront(restoredWindow.id);
        //     console.log('窗口已恢复:', windowId);
        // }
    };

    // 打开新窗口（不再处理隐藏窗口的逻辑）
    const openWindow = (component, componentProps = {}, title = '新窗口') => {
        const rawComponent = markRaw(component);

        // 检查是否已存在相同窗口（仅在visible窗口中检查）
        const existingWindow = windows.value.find(w =>
            w.component === rawComponent &&
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
            component: rawComponent,
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
        return windowId;
    };

    const closeWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        if (index !== -1) {
            windows.value.splice(index, 1);
        }
    };

    return {
        windows,
        hiddenWindows,
        openWindow,
        closeWindow,
        hideWindow,
        restoreWindow, // 新增的独立恢复方法
        bringToFront
    };
});