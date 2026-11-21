
import {
  bingoTasks,
  type BingoCategory,
  type BingoTaskTemplate
} from '../data/bingoTasks'

export type GeneratedBingoTask = {
  id: string
  templateId: string
  category: BingoCategory
  title: {
    pl: string
    en: string
  }
  completed: boolean
}

export type GenerateBingoOptions = {
  size?: number
  days: number
  categories: BingoCategory[]
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }

  return result
}

export function generateBingoBoard(
  options: GenerateBingoOptions
): GeneratedBingoTask[] {
  const {
    size = 5,
    days,
    categories
  } = options

  if (
    !Number.isInteger(size) ||
    size < 2 ||
    size > 7
  ) {
    throw new Error('Board size must be between 2 and 7')
  }

  if (!Number.isInteger(days) || days < 1) {
    throw new Error('Trip duration must be at least one day')
  }

  if (categories.length === 0) {
    throw new Error('Select at least one category')
  }

  const count = size * size

  const selectedCategories = [...new Set(categories)]

  const available = bingoTasks.filter(
    (task) => selectedCategories.includes(task.category)
  )

  if (available.length < count) {
    throw new Error(
      `Not enough unique tasks. Available: ${available.length}, required: ${count}`
    )
  }

  // Group templates by category.
  const pools = new Map<BingoCategory, BingoTaskTemplate[]>()

  for (const category of selectedCategories) {
    pools.set(
      category,
      shuffle(available.filter(
        (task) => task.category === category
      ))
    )
  }

  const selected: BingoTaskTemplate[] = []

  // Rotate through categories for a balanced board.
  while (selected.length < count) {
    let added = false

    for (const category of shuffle(selectedCategories)) {
      if (selected.length >= count) break

      const task = pools.get(category)?.pop()

      if (task) {
        selected.push(task)
        added = true
      }
    }

    if (!added) break
  }

  if (selected.length !== count) {
    throw new Error('Could not generate a complete board')
  }

  return shuffle(selected).map((task, index) => ({
    id: `cell-${index + 1}`,
    templateId: task.id,
    category: task.category,
    title: { ...task.title },
    completed: false
  }))
}

export function replaceBingoTask(
  board: GeneratedBingoTask[],
  index: number,
  categories: BingoCategory[]
): GeneratedBingoTask[] {
  if (index < 0 || index >= board.length) {
    return board
  }

  const usedIds = new Set(
    board.map((task) => task.templateId)
  )

  const alternatives = bingoTasks.filter(
    (task) =>
      categories.includes(task.category) &&
      !usedIds.has(task.id)
  )

  if (alternatives.length === 0) {
    return board
  }

  const replacement = shuffle(alternatives)[0]!

  return board.map((task, currentIndex) => {
    if (currentIndex !== index) return task

    return {
      ...task,
      templateId: replacement.id,
      category: replacement.category,
      title: { ...replacement.title },
      completed: false
    }
  })
}
