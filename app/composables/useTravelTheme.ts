
import { computed } from 'vue'
import { travelThemes } from '~/data/themes'
import type { ThemeId } from '~/types/theme'

export const useTravelTheme = () => {
  const themeId = useState<ThemeId>(
    'travel-theme',
    () => 'adriatic'
  )

  const currentTheme = computed(() =>
    travelThemes.find(
      theme => theme.id === themeId.value
    ) ?? travelThemes[0]!
  )

  const setTheme = (id: ThemeId) => {
    themeId.value = id

    if (import.meta.client) {
      localStorage.setItem(
        'travel-bingo-theme',
        id
      )
    }
  }

  const loadSavedTheme = () => {
    if (!import.meta.client) return

    const saved = localStorage.getItem(
      'travel-bingo-theme'
    )

    const validTheme = travelThemes.find(
      theme => theme.id === saved
    )

    if (validTheme) {
      themeId.value = validTheme.id
    }
  }

  return {
    themeId,
    currentTheme,
    themes: travelThemes,
    setTheme,
    loadSavedTheme
  }
}
