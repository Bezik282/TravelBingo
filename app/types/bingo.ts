
export type Language = 'en' | 'pl'

export type TaskCategory = 'nature' | 'romance'

export type TaskDay = 1 | 2 | 3 | 'any'

export interface TaskTranslation {
  title: string
  description: string
  location: string
}

export interface BingoTask {
  id: string
  emoji: string

  // Oryginalna treść zadania
  title: string
  description: string
  location: string

  // Język oryginału
  sourceLanguage?: Language

  // Tłumaczenia generowane automatycznie
  translations?: Partial<
    Record<Language, TaskTranslation>
  >

  day: TaskDay
  category: TaskCategory
  completed?: boolean
}

export interface BingoTrip {
  id: string
  title: string
  destination: string
  country: string
  durationDays: number
  boardSize: number
  tasks: BingoTask[]
}
