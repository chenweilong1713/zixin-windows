import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default function useWindowManager() {
    const router = useRouter()
    const windows = ref([])

    // 打开新窗口
    const openWindow = (routePath, title = '新窗口') => {
        const windowId = `window_${Date.now()}`

        // 先导航到目标路由
        router.push({
            path: routePath,
            // 关键：传递窗口ID作为路由参数
            params: { windowId }
        })

        // 再创建窗口记录
        windows.value.push({
            id: windowId,
            routePath,
            title,
            visible: true,
            position: { x: 100 + (windows.value.length * 30), y: 100 + (windows.value.length * 30) },
            size: { width: 600, height: 400 }
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