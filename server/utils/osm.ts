
import { createError } from 'h3'

export type LocationResult = {
  id: string
  name: string
  displayName: string
  lat: number
  lon: number
}

export type PlaceResult = {
  id: string
  name: string
  lat: number
  lon: number
  category: string
  distanceKm: number
}

export function getOsmHeaders() {
  const config = useRuntimeConfig()

  if (!config.osmContactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OSM contact email is not configured'
    })
  }

  return {
    'User-Agent': `TravelBingo/0.4 (${config.osmContactEmail})`,
    'Accept': 'application/json'
  }
}

export function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const rad = Math.PI / 180
  const dLat = (lat2 - lat1) * rad
  const dLon = (lon2 - lon1) * rad

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) *
      Math.cos(lat2 * rad) *
      Math.sin(dLon / 2) ** 2

  return 6371 * 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  )
}
