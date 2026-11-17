
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const {
  currentTheme,
  loadSavedTheme
} = useTravelTheme()

const {
  t,
  loadSavedLanguage
} = useLanguage()

const isReady = ref(false)

onMounted(() => {
  loadSavedTheme()
  loadSavedLanguage()
  isReady.value = true
})

const themeStyle = computed(() => ({
  '--primary': currentTheme.value.primary,
  '--secondary': currentTheme.value.secondary,
  '--background': currentTheme.value.background,
  '--surface': currentTheme.value.surface,
  '--text': currentTheme.value.text,
  '--muted': currentTheme.value.muted
}))
</script>

<template>
  <div
    v-if="isReady"
    class="app"
    :style="themeStyle"
  >
    <NuxtPage />
  </div>

  <div v-else class="app-loading">
    <div class="app-loading-content">
      <div class="app-loading-icon">🌍</div>
      <h1>Travel Bingo</h1>
      <p>{{ t.loading }}</p>
    </div>
  </div>
</template>
