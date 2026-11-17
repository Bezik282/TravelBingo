
import type {
  BingoTask,
  TaskTranslation
} from '~/types/bingo'

import { useLanguage } from '~/composables/useLanguage'

export function useTaskTranslation() {
  const { language } = useLanguage()

  const getTaskTranslation = (
    task: BingoTask
  ): TaskTranslation => {
    const translation =
      task.translations?.[language.value]

    if (translation) {
      return translation
    }

    // Jeśli tłumaczenie nie istnieje,
    // pokazujemy oryginalną treść.
    return {
      title: task.title,
      description: task.description,
      location: task.location
    }
  }

  return {
    getTaskTranslation
  }
}
