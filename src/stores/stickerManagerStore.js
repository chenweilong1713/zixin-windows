import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// 建议修改贴纸相关内容后，修改这里的版本号，要不然客户端会一直获取旧的缓存数据
const STORAGE_KEY = 'desktop-stickers-v10'

export const useStickerManagerStore = defineStore('stickerManager', () => {
    /* ================= 状态 ================= */

    const stickers = ref([])
    let maxZIndex = 1

    /* ================= 持久化 ================= */

    const loadFromStorage = () => {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        try {
            stickers.value = JSON.parse(raw)
            updateMaxZIndex()
        } catch (e) {
            console.warn('[Sticker] load failed', e)
        }
    }
    // 初始化时删除过期的数据
    const removeOverdueStorage = () => {
        // 获取所有缓存数据
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith('desktop-stickers-') && key !== STORAGE_KEY) {
                localStorage.removeItem(key)
            }
        })
    }

    const saveToStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers.value))
    }

    watch(stickers, saveToStorage, { deep: true })

    /* ================= 工具 ================= */

    const updateMaxZIndex = () => {
        maxZIndex = stickers.value.reduce(
            (max, s) => Math.max(max, s.zIndex || 1),
            1
        )
    }

    const bringToFront = (id) => {
        updateMaxZIndex()
        const sticker = stickers.value.find(s => s.id === id)
        if (sticker) {
            sticker.zIndex = maxZIndex + 1
        }
    }

    /* ================= CRUD ================= */

    const createSticker = (
        title,
        items,
        position = { x: 120, y: 80 }
    ) => {
        updateMaxZIndex()

        const sticker = {
            id: `sticker_${Date.now()}`,
            title,
            items,
            position,
            visible: true,
            zIndex: maxZIndex + 1
        }

        stickers.value.push(sticker)
        return sticker.id
    }

    const updatePosition = (id, x, y) => {
        const sticker = stickers.value.find(s => s.id === id)
        if (sticker) {
            sticker.position.x = x
            sticker.position.y = y
        }
    }

    const hideSticker = (id) => {
        const sticker = stickers.value.find(s => s.id === id)
        if (sticker) {
            sticker.visible = false
        }
    }

    const restoreSticker = (id) => {
        const sticker = stickers.value.find(s => s.id === id)
        if (sticker) {
            sticker.visible = true
            bringToFront(id)
        }
    }

    const removeSticker = (id) => {
        const index = stickers.value.findIndex(s => s.id === id)
        if (index !== -1) {
            stickers.value.splice(index, 1)
        }
    }

    /* ================= 初始化 ================= */

    loadFromStorage()
    removeOverdueStorage()

    // 删除旧数据

    return {
        stickers,
        createSticker,
        updatePosition,
        hideSticker,
        restoreSticker,
        removeSticker,
        bringToFront
    }
})
