<template>
  <!-- 主组件 -->
  <div class="contribution-container">
    <!-- 年份切换 -->
    <div class="header">
      <span>GitHub Contributions</span>
      <select v-model="year" @change="fetchContributions">
        <option v-for="y in years" :key="y" :value="y">
          {{ y }}
        </option>
      </select>
    </div>

    <!-- Heatmap -->
<!--    <div v-if="loading" class="loading">Loading…</div>-->

    <div class="heatmap">
      <div v-for="(week, w) in weeks" :key="w" class="week">
        <div
            v-for="day in week"
            :key="day.date"
            class="day"
            :style="{ backgroundColor: getColor(day.count) }"
            @mouseenter="showTooltip($event, day)"
            @mouseleave="hideTooltip"
        />
      </div>
    </div>
  </div>

  <!-- ⭐️ Tooltip：Teleport 到 body -->
  <Teleport to="body">
    <div
        v-if="tooltip.visible"
        class="tooltip"
        :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
    >
      <strong>{{ tooltip.count }}</strong> 次提交<br />
      {{ tooltip.date }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

/* ================= 配置 ================= */
const GITHUB_USERNAME = 'chenweilong1713'
const GITHUB_TOKEN = ''
/* ======================================= */

interface Day {
  date: string
  count: number
}

const loading = ref(true)
const year = ref(2025)
const contributions = ref<Day[]>([])

/** GitHub 可用年份（往前 10 年） */
const years = Array.from({ length: 10 }, (_, i) => year.value - i)

/** GitHub 官方配色 */
const colors = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
]

/* ================= Tooltip ================= */
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  date: '',
  count: 0,
})

function showTooltip(e: MouseEvent, day: Day) {
  const offset = 12
  let x = e.clientX + offset
  let y = e.clientY + offset

  // 防止超出右边界（可选但推荐）
  const tooltipWidth = 120
  if (x + tooltipWidth > window.innerWidth) {
    x = e.clientX - tooltipWidth - offset
  }

  tooltip.value = {
    visible: true,
    x,
    y,
    date: day.date,
    count: day.count,
  }
}

function hideTooltip() {
  tooltip.value.visible = false
}
/* ========================================== */

/** 拉取指定年份 GitHub 贡献数据 */
async function fetchContributions() {
  loading.value = true

  const from = `${year.value}-01-01T00:00:00Z`
  const to = `${year.value}-12-31T23:59:59Z`

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { login: GITHUB_USERNAME, from, to },
    }),
  })

  const json = await res.json()

  contributions.value =
    json.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((w: any) =>
        w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
        }))
      )

  loading.value = false
}

onMounted(fetchContributions)

/** Map 方便查找 */
const dataMap = computed(() => {
  const map = new Map<string, number>()
  contributions.value.forEach(d => map.set(d.date, d.count))
  return map
})

/** 构建整年 Heatmap（对齐 GitHub 周结构） */
const weeks = computed(() => {
  const result: Day[][] = []

  const start = new Date(`${year.value}-01-01`)
  start.setDate(start.getDate() - start.getDay())

  const end = new Date(`${year.value}-12-31`)
  const date = new Date(start)

  while (date <= end) {
    const week: Day[] = []
    for (let i = 0; i < 7; i++) {
      const key = date.toISOString().slice(0, 10)
      week.push({
        date: key,
        count: dataMap.value.get(key) ?? 0,
      })
      date.setDate(date.getDate() + 1)
    }
    result.push(week)
  }

  return result
})

function getColor(count: number) {
  if (count === 0) return colors[0]
  if (count < 3) return colors[1]
  if (count < 6) return colors[2]
  if (count < 10) return colors[3]
  return colors[4]
}
</script>

<style scoped>
/* 主容器：fixed + transform 居中 */
.contribution-container {
  /*
  position: fixed;
  left: 50%;
  top: 15%;

  //transform: translateX(-50%);
  */
  width: fit-content;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

select {
  padding: 2px 6px;
  font-size: 12px;
}

.loading {
  font-size: 13px;
  color: #666;
}

.heatmap {
  display: flex;
  gap: 5px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  cursor: pointer;
}

.day:hover {
  outline: 1px solid rgba(0, 0, 0, 0.2);
}

/* Tooltip（Teleport + fixed） */
.tooltip {
  position: fixed;
  z-index: 9999;
  background: #24292f;
  color: #fff;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 6px;
  pointer-events: none;
  white-space: nowrap;
}
</style>
