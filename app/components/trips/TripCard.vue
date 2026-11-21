
<script setup lang="ts">
import { computed } from 'vue'
import type { BingoTrip } from '~/types/bingo'

const props = defineProps<{
  trip: BingoTrip
}>()

const { t, language } = useLanguage()

const {
  completedCount,
  totalCount,
  progress
} = useBingo(props.trip)

const durationLabel = computed(() => {
  const days = props.trip.durationDays

  if (language.value === 'pl') {
    if (days === 1) return '1 dzień'
    if (days >= 2 && days <= 4) return `${days} dni`
    return `${days} dni`
  }

  return `${days} ${days === 1 ? 'day' : 'days'}`
})

const countryLabel = computed(() => {
  if (language.value === 'pl' && props.trip.country === 'Croatia') {
    return 'Chorwacja'
  }

  return props.trip.country
})

const completedLabel = computed(() => {
  if (language.value === 'pl') {
    return `${completedCount.value} z ${totalCount} ukończonych`
  }

  return `${completedCount.value} of ${totalCount} challenges completed`
})
</script>

<template>
  <article class="card trip-card">
    <div class="eyebrow">
      📍 {{ countryLabel }} · {{ durationLabel }}
    </div>

    <h3>{{ trip.title }}</h3>

    <p>
      {{ trip.destination }} ·
      {{ totalCount }} {{ t.challenges }}
    </p>

    <div
      class="progress-track"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="completedLabel"
    >
      <div
        class="progress-fill"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <p class="trip-progress-label">
      {{ completedLabel }}
      <strong>({{ progress }}%)</strong>
    </p>

    <NuxtLink
      class="primary-button trip-open-button"
      :to="`/trips/${trip.id}`"
    >
      {{ t.openBingo }} →
    </NuxtLink>
  </article>
</template>
