import { ref, computed,markRaw } from 'vue'

export default function useWindowManager() {
    const windows = ref([])

    let maxZIndex = 1

    // 更新最大zIndex
    const updateMaxZIndex = () => {
        maxZIndex = windows.value.reduce((max, window) => {
            return Math.max(max, window.zIndex || 1)
        }, 1)
    }

    // 置顶窗口
    const bringToFront = (windowId) => {
        updateMaxZIndex()
        const windowIndex = windows.value.findIndex(w => w.id === windowId)
        if (windowIndex !== -1) {
            windows.value[windowIndex].zIndex = maxZIndex + 1
        }
    }

    // 打开新窗口
    const openWindow = (component, componentProps = {}, title = '新窗口') => {
        const windowId = `window_${Date.now()}`

        // 检查是否已经打开相同组件的窗口
        const existingWindow = windows.value.find(w =>
            w.component === component &&
            JSON.stringify(w.componentProps) === JSON.stringify(componentProps)
        )

        if (existingWindow) {
            // 如果窗口已存在，将其置顶并显示
            bringToFront(existingWindow.id)
            existingWindow.visible = true
            return existingWindow.id
        }

        windows.value.push({
            id: windowId,
            component:markRaw(component),
            componentProps,
            title,
            visible: true,
            position: { x: 300 + (windows.value.length * 30), y: 50 + (windows.value.length * 30) },
            size: { width: 1100, height: 750 },
            zIndex: maxZIndex + 1
        })

        return windowId
    }

    // 关闭窗口
    const closeWindow = (windowId) => {
        const index = windows.value.findIndex(w => w.id === windowId)
        if (index !== -1) {
            windows.value.splice(index, 1)
        }
    }

    // 获取所有活动窗口
    const activeWindows = computed(() => windows.value.filter(w => w.visible))

    return {
        windows,
        activeWindows,
        openWindow,
        closeWindow,
        bringToFront
    }
}