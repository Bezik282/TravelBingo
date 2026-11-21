
<script setup lang="ts">
import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'
import TripCard from '~/components/trips/TripCard.vue'
import { getAllTrips } from '~/data/trips'

const {
  themes,
  themeId,
  setTheme
} = useTravelTheme()

const { t, language } = useLanguage()

const trips = getAllTrips()
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

      <h1>{{ t.heroTitle }}</h1>

      <p>{{ t.heroDescription }}</p>
    </section>

    <section class="card">
      <h2 class="section-title">
        🎨 {{ t.chooseTheme }}
      </h2>

      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.id"
          type="button"
          class="theme-option"
          :class="{ active: themeId === theme.id }"
          :aria-pressed="themeId === theme.id"
          @click="setTheme(theme.id)"
        >
          <div
            class="theme-preview"
            :style="{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
            }"
          />

          <span>{{ theme.name }}</span>
        </button>
      </div>
    </section>

    <section class="trips-section">
      <div class="trips-heading">
        <div>
          <div class="eyebrow">
            {{ language === 'pl'
              ? 'Nasza kolekcja'
              : 'Our collection' }}
          </div>

          <h2 class="section-title">
            {{ language === 'pl'
              ? 'Nasze podróże'
              : 'Our trips' }}
          </h2>
        </div>

        <span class="trips-count">
          {{ trips.length }}
          {{ language === 'pl'
            ? 'podróży'
            : trips.length === 1
              ? 'trip'
              : 'trips' }}
        </span>
      </div>

      <div
        v-if="trips.length > 0"
        class="trips-grid"
      >
        <TripCard
          v-for="trip in trips"
          :key="trip.id"
          :trip="trip"
        />
      </div>

      <div v-else class="card trips-empty">
        <div class="trips-empty-icon">🧳</div>

        <h3>
          {{ language === 'pl'
            ? 'Brak podróży'
            : 'No trips yet' }}
        </h3>

        <p>
          {{ language === 'pl'
            ? 'Twoje przyszłe przygody pojawią się tutaj.'
            : 'Your future adventures will appear here.' }}
        </p>
      </div>
    </section>
  </main>
</template>
