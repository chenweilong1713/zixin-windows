import { ref, computed,markRaw } from 'vue'

export default function useWindowManager() {
    const windows = ref([])

    // 打开新窗口
    const openWindow = (component, componentProps = {}, title = '新窗口') => {
        const windowId = `window_${Date.now()}`




        windows.value.push({
            id: windowId,
            component:markRaw(component),
            componentProps,
            title,
            visible: true,
            position: { x: 100 + (windows.value.length * 30), y: 100 + (windows.value.length * 30) },
            size: { width: 1600, height: 400 }
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
        closeWindow
    }
}