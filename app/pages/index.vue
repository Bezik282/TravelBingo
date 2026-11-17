
<script setup lang="ts">
const {
  themes,
  themeId,
  setTheme
} = useTravelTheme()


import { getAllTrips } from '~/data/trips'

const trips = getAllTrips()
const splitBingo = trips.find(trip => trip.id === 'split')!
const {
  completedCount,
  totalCount,
  progress
} = useBingo(splitBingo)

import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'

const { t } = useLanguage()

</script>

<template>
  <main class="container">
    <header class="header">
      <div class="brand">
        🌍 Travel Bingo
      </div>

      <div class="header-actions">
  <span>❤️ {{ t.forTwo }}</span>
  <LanguageSwitcher />
</div>
    </header>

    <section class="hero">
      <div class="eyebrow">
        	{{ t.heroLabel }}
      </div>

      <h1>
        {{ t.heroTitle }}
      </h1>

      <p>
       {{ t.heroDescription }}
      </p>
    </section>

    <section class="card">
      <h2 class="section-title">
        🎨 {{ t.chooseTheme }}
      </h2>

      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="theme-option"
          :class="{ active: themeId === theme.id }"
          :aria-pressed="themeId === theme.id"
          @click="setTheme(theme.id)"
        >
          <div
            class="theme-preview"
            :style="{
              background: `linear-gradient(135deg,
                ${theme.primary},
                ${theme.secondary})`
            }"
          />

          <span>{{ theme.name }}</span>
        </button>
      </div>
    </section>

    <section class="card trip-card">
      <div class="eyebrow">
        🇭🇷 Croatia · 3 days
      </div>

      <h3>Split Adventure</h3>

      <p>
        25 {{ t.challenges }} · {{ t.natureRomance }}
      </p>

      <div class="progress-track">
       <div
  class="progress-fill"
  :style="{ width: `${progress}%` }"
      />
      </div>

      <p>
  {{ completedCount }} of
  {{ totalCount }} challenges completed
</p>

      <button
        class="primary-button"
        @click="navigateTo('/trips/split')"
      >
        {{ t.openBingo }} →
      </button>
    </section>
  </main>
</template>
