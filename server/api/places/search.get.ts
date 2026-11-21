
import {
  defineEventHandler,
  getQuery,
  createError
} from 'h3'

import {
  distanceKm,
  getOsmHeaders,
  type PlaceResult
} from '../../utils/osm'

type OsmElement = {
  type: 'node' | 'way' | 'relation'
  id: number
  lat?: number
  lon?: number
  center?: {
    lat: number
    lon: number
  }
  tags?: Record<string, string>
}

type OverpassResponse = {
  elements: OsmElement[]
}

type CacheEntry = {
  expires: number
  data: PlaceResult[]
}

const cache = new Map<string, CacheEntry>()

const pending = new Map<string, Promise<PlaceResult[]>>()

const OVERPASS_SERVERS = [
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
]

const categoryTags = [
  ['tourism', 'viewpoint', 'viewpoint'],
  ['tourism', 'attraction', 'attraction'],
  ['tourism', 'museum', 'museum'],
  ['historic', 'monument', 'historic'],
  ['historic', 'castle', 'historic'],
  ['historic', 'archaeological_site', 'historic'],
  ['leisure', 'park', 'nature'],
  ['natural', 'beach', 'beach'],
  ['natural', 'peak', 'nature']
] as const

async function fetchOverpass(
  overpassQuery: string
): Promise<OverpassResponse> {
  const headers = getOsmHeaders()

  let lastError: unknown

  for (const server of OVERPASS_SERVERS) {
    try {
      console.info('[Travel Bingo] Trying:', server)

      const response = await $fetch<OverpassResponse>(
        server,
        {
          method: 'POST',
          body: new URLSearchParams({
            data: overpassQuery
          }).toString(),
          headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          timeout: 15000,
          retry: 0
        }
      )

      console.info(
        '[Travel Bingo] Overpass success:',
        response.elements.length,
        'elements'
      )

      return response
    } catch (error: unknown) {
      lastError = error

      const details = error as {
        status?: number
        statusCode?: number
        message?: string
      }

      const status = details.status ?? details.statusCode

      console.warn(
        '[Travel Bingo] Overpass failed:',
        server,
        status ?? details.message
      )

      // Do not bypass rate limiting with another endpoint.
      if (status === 429) {
        throw createError({
          statusCode: 503,
          statusMessage:
            'Overpass rate limit reached. Please try again later.'
        })
      }
    }
  }

  console.error(
    '[Travel Bingo] All Overpass servers failed:',
    lastError
  )

  throw createError({
    statusCode: 502,
    statusMessage: 'Overpass servers are unavailable'
  })
}

async function findPlaces(
  lat: number,
  lon: number,
  radiusKm: number
): Promise<PlaceResult[]> {
  const radiusMeters = Math.round(radiusKm * 1000)

  const selectors = categoryTags
    .map(([key, value]) => {
      return `nwr(around:${radiusMeters},${lat},${lon})["${key}"="${value}"]["name"];`
    })
    .join('\n')

  const overpassQuery = `
    [out:json][timeout:15];
    (
      ${selectors}
    );
    out center;
  `

  const response = await fetchOverpass(overpassQuery)

  const places: PlaceResult[] = []
  const seen = new Set<string>()

  for (const item of response.elements) {
    const name = item.tags?.name

    const placeLat = item.lat ?? item.center?.lat
    const placeLon = item.lon ?? item.center?.lon

    if (!name || placeLat == null || placeLon == null) {
      continue
    }

    const distance = distanceKm(
      lat,
      lon,
      placeLat,
      placeLon
    )

    if (distance > radiusKm) continue

    const normalizedName = name.trim().toLowerCase()

    if (seen.has(normalizedName)) continue

    seen.add(normalizedName)

    const matchedCategory = categoryTags.find(
      ([key, value]) => item.tags?.[key] === value
    )

    places.push({
      id: `${item.type}/${item.id}`,
      name,
      lat: placeLat,
      lon: placeLon,
      category: matchedCategory?.[2] ?? 'other',
      distanceKm: Math.round(distance * 100) / 100
    })
  }

  places.sort((a, b) => a.distanceKm - b.distanceKm)

  return places.slice(0, 100)
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const lat = Number(query.lat)
  const lon = Number(query.lon)
  const radiusKm = Number(query.radius ?? 4)

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180 ||
    !Number.isFinite(radiusKm) ||
    radiusKm < 1 ||
    radiusKm > 10
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid coordinates or radius'
    })
  }

  const cacheKey = [
    lat.toFixed(4),
    lon.toFixed(4),
    radiusKm
  ].join(':')

  const cached = cache.get(cacheKey)

  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  const existingRequest = pending.get(cacheKey)

  if (existingRequest) {
    return await existingRequest
  }

  const request = findPlaces(lat, lon, radiusKm)

  pending.set(cacheKey, request)

  try {
    const result = await request

    cache.set(cacheKey, {
      expires: Date.now() + 24 * 60 * 60 * 1000,
      data: result
    })

    return result
  } finally {
    pending.delete(cacheKey)
  }
})
