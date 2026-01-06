import {defineStore} from 'pinia';
import {ref, markRaw} from 'vue';

export const useWindowManagerStore = defineStore('windowManager', () => {
    // 状态
    const windows = ref([]);
    // 当前最大zIndex
    let maxZIndex = 1;

    /**
     * 更新最大zIndex
     */
    const updateMaxZIndex = () => {
        maxZIndex = windows.value.reduce((max, window) =>
            Math.max(max, window.zIndex || 1), 1);
    };

    /**
     * 置顶窗口
     * @param windowId 窗口id
     */
    const bringToFront = (windowId) => {
        updateMaxZIndex();
        const window = windows.value.find(w => w.id === windowId);
        if (window) {
            window.zIndex = maxZIndex + 1;
        }
    };

    /**
     *  隐藏窗口（修改window对象的visible属性）
     * @param windowId 窗口id
     */
    const hideWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        windows.value[index].visible = false
    };

    /**
     * 恢复窗口
     * @param windowId
     */
    const restoreWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        windows.value[index].visible = true
        bringToFront(windows.value[index].id);
    };

    /**
     * 打开新窗口
     * @param component 窗口内显示的组件
     * @param componentProps 传递给组件的属性
     * @param title 标题
     * @param iconComponent
     * @returns {*|string} 返回窗口Id
     */
    const openWindow = (component, componentProps = {}, title = '新窗口', iconComponent) => {
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
        if (iconComponent === undefined) {
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
                size: {width: 1100, height: 750},
                zIndex: maxZIndex + 1
            });
        } else {
            windows.value.push({
                id: windowId,
                component: rawComponent,
                componentProps,
                title,
                visible: true,
                iconComponent: markRaw(iconComponent),
                position: {
                    x: 300 + (windows.value.length * 30),
                    y: 50 + (windows.value.length * 30)
                },
                size: {width: 1100, height: 750},
                zIndex: maxZIndex + 1
            });
        }
        return windowId;

    };

    /**
     * 关闭窗口（将window从windows数组中移除）
     * @param windowId
     */
    const closeWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId);
        if (index !== -1) {
            windows.value.splice(index, 1);
        }
    };

    return {
        windows,
        openWindow,
        closeWindow,
        hideWindow,
        restoreWindow,
        bringToFront
    };
});