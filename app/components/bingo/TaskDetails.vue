
<script setup lang="ts">

const { getTaskTranslation } = useTaskTranslation()
import type { BingoTask } from '~/types/bingo'

defineProps<{
  task: BingoTask
  completed: boolean
}>()

defineEmits<{
  close: []
  toggle: []
}>()


const { currentTheme } = useTravelTheme()

const modalThemeStyle = computed(() => ({
  '--primary': currentTheme.value.primary,
  '--secondary': currentTheme.value.secondary,
  '--background': currentTheme.value.background,
  '--surface': currentTheme.value.surface,
  '--text': currentTheme.value.text,
  '--muted': currentTheme.value.muted
}))

const { t } = useLanguage()

const dayLabel = (day: BingoTask['day']) =>
  day === 'any' ? t.value.anyDay : `${t.value.day} ${day}`
</script>

<template>
  <Teleport to="body">
   <div
  class="task-overlay"
  :style="modalThemeStyle"
  @click.self="$emit('close')"
>
      <section
        class="task-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`task-title-${task.id}`"
      >
        <button
          class="task-close"
          type="button"
          aria-label="Close"
          @click="$emit('close')"
        >
          ×
        </button>

        <div class="task-hero">
          <span>{{ task.emoji }}</span>
        </div>

        <div class="task-content">
          <div class="task-meta">
            <span>
              📅 {{ dayLabel(task.day) }}
            </span>

            <span>
              {{ task.category === 'nature'
                  ? t.nature
                  : t.romance }}
            </span>
          </div>

          <h2 :id="`task-title-${task.id}`">
            {{ getTaskTranslation(task).title }}
          </h2>

          <p class="task-description">
            {{ getTaskTranslation(task).description }}
          </p>

          <div class="task-location">
            <span>📍</span>

            <div>
              <strong>{{t.location}}</strong>
              <p>{{ getTaskTranslation(task).location }}</p>
            </div>
          </div>

          <button
            class="primary-button task-action"
            type="button"
            @click="$emit('toggle')"
          >
            {{
              completed
                ? t.markIncomplete
                : t.completeChallenge
            }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
