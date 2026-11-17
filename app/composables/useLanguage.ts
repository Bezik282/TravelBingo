
import { computed } from 'vue'

export type Language = 'en' | 'pl'

const translations = {
  en: {
    brand: 'Travel Bingo',
    forTwo: 'For two',
    heroLabel: 'Our adventures together',
    heroTitle: 'Every trip. A new adventure.',
    heroDescription: 'Discover beautiful places, create memories and complete unique Bingo challenges together.',
    chooseTheme: 'Choose your theme',
    challenges: 'challenges',
    natureRomance: 'Nature & Romance',
    openBingo: 'Open our Bingo',
    completed: 'completed',
    back: 'Back',
    ourAdventure: 'Our adventure',
    ourBingo: 'Our Bingo',
    completeTogether: 'Complete challenges together!',
    bingoLines: 'Bingo lines',
    exploreChallenges: 'Explore challenges',
    allDays: 'All days',
    day: 'Day',
    anyDay: 'Any day',
    location: 'Location',
    nature: 'Nature & Water',
    romance: 'Romance',
    completeChallenge: 'Complete challenge',
    markIncomplete: 'Mark as incomplete',
    bingoMessage: "BINGO! You've completed",
    line: 'line',
    lines: 'lines',
    allCompleted: "Amazing! You've completed your entire adventure together!",
    tripNotFound: 'Trip not found',
    loading: 'Loading your adventure...'
  },
  pl: {
    brand: 'Travel Bingo',
    forTwo: 'Dla dwojga',
    heroLabel: 'Nasze wspólne przygody',
    heroTitle: 'Każda podróż. Nowa przygoda.',
    heroDescription: 'Odkrywajcie piękne miejsca, twórzcie wspomnienia i wspólnie realizujcie wyjątkowe wyzwania Bingo.',
    chooseTheme: 'Wybierz motyw',
    challenges: 'wyzwań',
    natureRomance: 'Natura i romantyczne chwile',
    openBingo: 'Otwórz nasze Bingo',
    completed: 'ukończonych',
    back: 'Wróć',
    ourAdventure: 'Nasza przygoda',
    ourBingo: 'Nasze Bingo',
    completeTogether: 'Realizujcie wyzwania razem!',
    bingoLines: 'Ukończone linie Bingo',
    exploreChallenges: 'Przeglądaj wyzwania',
    allDays: 'Wszystkie dni',
    day: 'Dzień',
    anyDay: 'Dowolny dzień',
    location: 'Lokalizacja',
    nature: 'Natura i woda',
    romance: 'Romantyczne chwile',
    completeChallenge: 'Zalicz zadanie',
    markIncomplete: 'Cofnij zaliczenie',
    bingoMessage: 'BINGO! Ukończone linie:',
    line: 'linia',
    lines: 'linie',
    allCompleted: 'Wspaniale! Ukończyliście razem całą przygodę!',
    tripNotFound: 'Nie znaleziono podróży',
    loading: 'Ładowanie przygody...'
  }
}

export function useLanguage() {
  const language = useState<Language>(
    'travel-language',
    () => 'en'
  )

  const t = computed(() => translations[language.value])

  const setLanguage = (value: Language) => {
    language.value = value

    if (import.meta.client) {
      localStorage.setItem('travel-bingo-language', value)
      document.documentElement.lang = value
    }
  }

  const loadSavedLanguage = () => {
    if (!import.meta.client) return

    const saved = localStorage.getItem(
      'travel-bingo-language'
    )

    if (saved === 'pl' || saved === 'en') {
      language.value = saved
    }

    document.documentElement.lang = language.value
  }

  return {
    language,
    t,
    setLanguage,
    loadSavedLanguage
  }
}
