
<script setup lang="ts">
import type { BingoTask } from '~/types/bingo'

defineProps<{
  task: BingoTask
  completed: boolean
  winning: boolean
}>()

defineEmits<{
  select: []
}>()

const { getTaskTranslation } = useTaskTranslation()
</script>

<template>
  <button
    type="button"
    class="bingo-cell"
    :class="{
      'bingo-cell--completed': completed,
      'bingo-cell--winning': winning
    }"
    :aria-label="task.title"
    :aria-pressed="completed"
    @click="$emit('select')"
  >
    <span
      v-if="completed"
      class="bingo-cell-check"
    >
      ✓
    </span>

    <span class="bingo-cell-emoji">
      {{ task.emoji }}
    </span>

    <span class="bingo-cell-title">
      {{ getTaskTranslation(task).title }}
    </span>
  </button>
</template>
