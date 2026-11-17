
import { computed, onMounted } from 'vue'
import type { BingoTrip } from '~/types/bingo'

export function useBingo(trip: BingoTrip) {
  const completedIds = useState<string[]>(
    `bingo-${trip.id}-completed`,
    () => []
  )

  const storageKey = `travel-bingo-${trip.id}`

  onMounted(() => {
    try {
      const saved = localStorage.getItem(storageKey)

      if (!saved) return

      const parsed: unknown = JSON.parse(saved)

      if (!Array.isArray(parsed)) return

      const validIds = new Set(
        trip.tasks.map(task => task.id)
      )

      completedIds.value = parsed.filter(
        (id): id is string =>
          typeof id === 'string' &&
          validIds.has(id)
      )
    } catch (error) {
      console.warn('Unable to load Bingo progress', error)
    }
  })

  const completedCount = computed(
    () => completedIds.value.length
  )

  const totalCount = trip.tasks.length

  const progress = computed(() =>
    totalCount > 0
      ? Math.round(
          completedCount.value / totalCount * 100
        )
      : 0
  )

  const isCompleted = (id: string) =>
    completedIds.value.includes(id)

  const toggleTask = (id: string) => {
    if (!trip.tasks.some(task => task.id === id)) {
      return
    }

    if (isCompleted(id)) {
      completedIds.value = completedIds.value.filter(
        taskId => taskId !== id
      )
    } else {
      completedIds.value = [
        ...completedIds.value,
        id
      ]
    }

    if (import.meta.client) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(completedIds.value)
        )
      } catch (error) {
        console.warn('Unable to save Bingo progress', error)
      }
    }
  }

  const size = trip.boardSize

  const lines: number[][] = []

  for (let row = 0; row < size; row++) {
    lines.push(
      Array.from(
        { length: size },
        (_, col) => row * size + col
      )
    )
  }

  for (let col = 0; col < size; col++) {
    lines.push(
      Array.from(
        { length: size },
        (_, row) => row * size + col
      )
    )
  }

  lines.push(
    Array.from(
      { length: size },
      (_, index) => index * size + index
    )
  )

  lines.push(
    Array.from(
      { length: size },
      (_, index) => index * size + (size - 1 - index)
    )
  )

  const completedLines = computed(() =>
    lines.filter(line =>
      line.every(index => {
        const task = trip.tasks[index]

        return task
          ? completedIds.value.includes(task.id)
          : false
      })
    )
  )

  const bingoCount = computed(
    () => completedLines.value.length
  )

  const winningTaskIds = computed(() => {
    const ids = new Set<string>()

    completedLines.value.forEach(line => {
      line.forEach(index => {
        const task = trip.tasks[index]

        if (task) ids.add(task.id)
      })
    })

    return ids
  })

  return {
    completedIds,
    completedCount,
    totalCount,
    progress,
    isCompleted,
    toggleTask,
    bingoCount,
    winningTaskIds
  }
}
