
<script setup lang="ts">

const { getTaskTranslation } = useTaskTranslation()

import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'

const { t } = useLanguage()

import { computed, ref } from 'vue'
import { getTripById } from '~/data/trips'
import type { BingoTask, TaskDay } from '~/types/bingo'

import BingoBoard from '~/components/bingo/BingoBoard.vue'
import TaskDetails from '~/components/bingo/TaskDetails.vue'


const route = useRoute()

const trip = getTripById(String(route.params.id))

if (!trip) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Trip not found'
  })
}

const {
  completedIds,
  completedCount,
  totalCount,
  progress,
  isCompleted,
  toggleTask,
  bingoCount,
  winningTaskIds
} = useBingo(trip)

const selectedTask = ref<BingoTask | null>(null)

const activeDay = ref<'all' | TaskDay>('all')

const setActiveDay = (day: 'all' | TaskDay) => {
  activeDay.value = day
}

const validTrip = computed(
  () => route.params.id === trip.id
)

const filteredTasks = computed(() => {
  if (activeDay.value === 'all') {
    return trip.tasks
  }

  return trip.tasks.filter(
    task =>
      task.day === activeDay.value ||
      task.day === 'any'
  )
})

const completedForDay = computed(() =>
  filteredTasks.value.filter(task =>
    isCompleted(task.id)
  ).length
)

const openTask = (task: BingoTask) => {
  selectedTask.value = task
}

const closeTask = () => {
  selectedTask.value = null
}

const completeSelectedTask = () => {
  if (!selectedTask.value) return

  toggleTask(selectedTask.value.id)
  closeTask()
}
</script>

<template>
  <main
    v-if="validTrip"
    class="container trip-page"
  >
    <header class="header">
      <NuxtLink to="/" class="back-link">
       ← {{t.back}} 
      </NuxtLink>

      <div class="header-actions">
  <div class="brand">🌍 Travel Bingo</div>
  <LanguageSwitcher />
</div>
    </header>

    <section class="trip-heading">
      <div class="eyebrow">
        🇭🇷 CROATIA · 3 DAYS
      </div>

      <h1>{{ trip.title }}</h1>

      <p>
        {{t.ourAdventure}}
      </p>
    </section>

    <section class="card bingo-section">
      <div class="bingo-top">
        <div>
          <h2>{{ t.ourBingo }}</h2>
<p>{{ t.completeTogether }}</p>
        </div>

        <div class="bingo-counter">
          {{ completedCount }} / {{ totalCount }}
        </div>
      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <div class="bingo-stats">
        <span>{{ progress }}% completed</span>
        <span>🏆 {{ bingoCount }} / 12 Bingo lines</span>
      </div>

     <BingoBoard
  :tasks="trip.tasks"
  :completed-ids="completedIds"
  :winning-task-ids="winningTaskIds"
  @select="openTask"
/>

      <div
        v-if="bingoCount > 0"
        class="bingo-celebration"
      >
        🎉{{t.bingoMessage}}
        {{ bingoCount }}
        {{ bingoCount === 1 ? 'line' : 'lines' }}!
      </div>

      <div
        v-if="completedCount === totalCount"
        class="bingo-celebration"
      >
         {{t.bingoLines}}
      </div>
    </section>

    <section class="card daily-section">
   <h2 class="section-title">
  📅 {{ t.exploreChallenges }}
</h2>

      <div class="day-filters">
        <button
        v-for="day in [
  { id: 'all', label: t.allDays },
  { id: 1, label: `${t.day} 1` },
  { id: 2, label: `${t.day} 2` },
  { id: 3, label: `${t.day} 3` }
]"
          :key="day.id"
          class="day-filter"
          :class="{ active: activeDay === day.id }"
          @click="setActiveDay(day.id as 'all' | TaskDay)"
        >
          {{ day.label }}
        </button>
      </div>

      <p class="daily-progress">
        {{ completedForDay }} of
        {{ filteredTasks.length }} challenges completed
      </p>

      <div class="daily-list">
        <button
          v-for="task in filteredTasks"
          :key="task.id"
          class="daily-task"
          @click="openTask(task)"
        >
          <span class="daily-emoji">
            {{ task.emoji }}
          </span>

          <span class="daily-task-info">
            <strong>{{ getTaskTranslation(task).title }}</strong>
            <small>📍 {{ getTaskTranslation(task).location }}</small>
          </span>

          <span
            class="daily-status"
            :class="{ done: isCompleted(task.id) }"
          >
            {{ isCompleted(task.id) ? '✓' : '›' }}
          </span>
        </button>
      </div>
    </section>

    <TaskDetails
      v-if="selectedTask"
      :task="selectedTask"
      :completed="isCompleted(selectedTask.id)"
      @close="closeTask"
      @toggle="completeSelectedTask"
    />
  </main>

  <main v-else class="container">
    <h1>Trip not found</h1>
    <NuxtLink to="/">Back to home</NuxtLink>
  </main>
</template>
