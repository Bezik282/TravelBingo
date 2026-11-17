
<script setup lang="ts">
import type { BingoTask } from '~/types/bingo'
import BingoCell from './BingoCell.vue'

defineProps<{
  tasks: BingoTask[]
  completedIds: string[]
  winningTaskIds: Set<string>
}>()

defineEmits<{
  select: [task: BingoTask]
}>()
</script>

<template>
  <div class="bingo-board">
    <BingoCell
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :completed="completedIds.includes(task.id)"
      :winning="winningTaskIds.has(task.id)"
      @select="$emit('select', task)"
    />
  </div>
</template>
