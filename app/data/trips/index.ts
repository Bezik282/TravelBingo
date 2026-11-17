
import type { BingoTrip } from '~/types/bingo'
import { splitBingo } from './split'

// Centralny rejestr wszystkich podróży
export const trips: BingoTrip[] = [
  splitBingo
]

// Pobieranie podróży na podstawie ID
export function getTripById(
  id: string
): BingoTrip | undefined {
  return trips.find(trip => trip.id === id)
}

// Pobieranie wszystkich podróży
export function getAllTrips(): BingoTrip[] {
  return trips
}
