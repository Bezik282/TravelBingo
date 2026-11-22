
<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  LocationResult,
  PlaceResult
} from '../../../server/utils/osm'

const { t, language } = useLanguage()

const query = ref('')
const locations = ref<LocationResult[]>([])
const selectedLocation = ref<LocationResult | null>(null)

const days = ref(3)
const boardSize = ref(5)
const radiusKm = ref(4)

const categories = ref([
  'nature',
  'romance',
  'exploration'
])

//Categories
const categoryOptions = [
  { id: 'nature', pl: '🌿 Natura i woda', en: '🌿 Nature & water' },
  { id: 'romance', pl: '❤️ Romantyczne chwile', en: '❤️ Romantic moments' },
  { id: 'exploration', pl: '🧭 Odkrywanie', en: '🧭 Exploration' },
  { id: 'food', pl: '🍓 Jedzenie', en: '🍓 Food' },
  { id: 'photos', pl: '📸 Fotografia', en: '📸 Photography' }
]

const places = ref<PlaceResult[]>([])
const isSearching = ref(false)
const isLoadingPlaces = ref(false)
const errorMessage = ref('')

const taskCount = computed(() => boardSize.value ** 2)
const isPolish = computed(() => language.value === 'pl')

function toggleCategory(id: string) {
  if (categories.value.includes(id)) {
    categories.value = categories.value.filter(
      category => category !== id
    )
  } else {
    categories.value = [...categories.value, id]
  }
}

async function searchLocations() {
  if (query.value.trim().length < 3 || isSearching.value) return

  isSearching.value = true
  errorMessage.value = ''
  selectedLocation.value = null
  locations.value = []
  places.value = []

  try {
    locations.value = await $fetch<LocationResult[]>(
      '/api/locations/search',
      { query: { q: query.value.trim() } }
    )
  } catch {
    errorMessage.value = isPolish.value
      ? 'Nie udało się wyszukać lokalizacji. Spróbuj ponownie za chwilę.'
      : 'Location search failed. Please try again shortly.'
  } finally {
    isSearching.value = false
  }
}

function selectLocation(location: LocationResult) {
  selectedLocation.value = location
  query.value = location.name
  locations.value = []
  places.value = []
  errorMessage.value = ''
}

async function loadPlaces() {
  if (!selectedLocation.value || isLoadingPlaces.value) return

  isLoadingPlaces.value = true
  errorMessage.value = ''
  places.value = []

  try {
    places.value = await $fetch<PlaceResult[]>(
      '/api/places/search',
      {
        query: {
          lat: selectedLocation.value.lat,
          lon: selectedLocation.value.lon,
          radius: radiusKm.value
        }
      }
    )
  } catch {
    errorMessage.value = isPolish.value
      ? 'Nie udało się pobrać atrakcji z OpenStreetMap.'
      : 'Could not load attractions from OpenStreetMap.'
  } finally {
    isLoadingPlaces.value = false
  }
}

const canSearchPlaces = computed(() =>
  selectedLocation.value !== null &&
  categories.value.length > 0
)
</script>

<template>
  <main class="container new-trip-page">
    <NuxtLink to="/" class="back-link">
      ← {{ isPolish ? 'Strona główna' : 'Home' }}
    </NuxtLink>

    <section class="hero">
      <div class="eyebrow">
        {{ isPolish ? 'Kreator podróży' : 'Trip creator' }}
      </div>

      <h1>
        🌍 {{ isPolish ? 'Nowa przygoda' : 'New adventure' }}
      </h1>

      <p>
        {{ isPolish
          ? 'Wybierz miejsce i ustawienia. Znajdziemy atrakcje, z których stworzymy Waszą planszę Bingo.'
          : 'Choose a destination and preferences. We will find attractions for your Bingo adventure.' }}
      </p>
    </section>

    <section class="card creator-card">
      <h2 class="section-title">
        📍 {{ isPolish ? 'Lokalizacja' : 'Destination' }}
      </h2>

      <form class="location-search" @submit.prevent="searchLocations">
        <input
          v-model="query"
          type="search"
          :placeholder="isPolish
            ? 'Np. Cavtat, Chorwacja'
            : 'E.g. Cavtat, Croatia'"
          @input="selectedLocation = null; places = []"
        />

        <button
          type="submit"
          class="primary-button"
          :disabled="isSearching || query.trim().length < 3"
        >
          {{ isSearching
            ? '...'
            : isPolish ? 'Szukaj' : 'Search' }}
        </button>
      </form>

      <div v-if="locations.length" class="location-results">
        <button
          v-for="location in locations"
          :key="location.id"
          type="button"
          class="location-result"
          @click="selectLocation(location)"
        >
          📍 {{ location.displayName }}
        </button>
      </div>

      <div v-if="selectedLocation" class="selected-location">
        ✓ {{ selectedLocation.displayName }}
      </div>
    </section>

    <section class="card creator-card">
      <h2 class="section-title">
        ⚙️ {{ isPolish ? 'Ustawienia podróży' : 'Trip settings' }}
      </h2>

      <div class="creator-fields">
        <label class="creator-field">
          <span>{{ isPolish ? 'Liczba dni' : 'Days' }}</span>
          <select v-model.number="days">
            <option v-for="day in 14" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </label>

        <label class="creator-field">
          <span>{{ isPolish ? 'Wielkość planszy' : 'Board size' }}</span>
          <select v-model.number="boardSize">
            <option :value="3">3 × 3 — 9</option>
            <option :value="4">4 × 4 — 16</option>
            <option :value="5">5 × 5 — 25</option>
          </select>
        </label>

        <label class="creator-field">
          <span>{{ isPolish ? 'Promień wyszukiwania' : 'Search radius' }}</span>
          <select v-model.number="radiusKm">
            <option :value="2">2 km</option>
            <option :value="4">4 km</option>
            <option :value="6">6 km</option>
            <option :value="8">8 km</option>
            <option :value="10">10 km</option>
          </select>
        </label>
      </div>

      <h3>{{ isPolish ? 'Kategorie zadań' : 'Challenge categories' }}</h3>

      <div class="creator-categories">
        <label
          v-for="category in categoryOptions"
          :key="category.id"
          class="creator-category"
        >
          <input
            type="checkbox"
            :checked="categories.includes(category.id)"
            @change="toggleCategory(category.id)"
          />

          {{ isPolish ? category.pl : category.en }}
        </label>
      </div>

      <div class="creator-summary">
        <strong>
          {{ taskCount }}
          {{ isPolish ? 'zadań' : 'challenges' }}
        </strong>

        <span>
          {{ days }}
          {{ isPolish ? 'dni' : 'days' }}
        </span>
      </div>

      <button
        type="button"
        class="primary-button"
        :disabled="!canSearchPlaces || isLoadingPlaces"
        @click="loadPlaces"
      >
        {{ isLoadingPlaces
          ? (isPolish ? 'Pobieranie atrakcji...' : 'Loading attractions...')
          : (isPolish ? '🔎 Znajdź atrakcje' : '🔎 Find attractions') }}
      </button>

      <p v-if="errorMessage" class="creator-error" role="alert">
        {{ errorMessage }}
      </p>
    </section>

    <section v-if="places.length" class="card creator-card">
      <h2 class="section-title">
        🗺️ {{ isPolish ? 'Znalezione atrakcje' : 'Found attractions' }}
      </h2>

      <p>
        {{ places.length }}
        {{ isPolish ? 'miejsc w okolicy' : 'nearby places' }}
      </p>

      <div class="places-list">
        <div
          v-for="place in places"
          :key="place.id"
          class="place-item"
        >
          <div>
            <strong>{{ place.name }}</strong>
            <small>{{ place.category }}</small>
          </div>

          <span>{{ place.distanceKm }} km</span>
        </div>
      </div>

      <p class="creator-note">
        {{ isPolish
          ? 'Następny etap: generowanie i edycja planszy na podstawie znalezionych miejsc.'
          : 'Next step: generating and editing a board from the discovered places.' }}
      </p>
    </section>

    <p class="osm-attribution">
      © OpenStreetMap contributors
    </p>
  </main>
</template>
