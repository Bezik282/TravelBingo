
import {
  defineEventHandler,
  getQuery,
  createError
} from 'h3'
import {
  getOsmHeaders,
  type LocationResult
} from '../../utils/osm'

type NominatimItem = {
  place_id: number
  name?: string
  display_name: string
  lat: string
  lon: string
}

const cache = new Map<
  string,
  { expires: number; data: LocationResult[] }
>()

let lastRequest = 0

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = String(query.q ?? '').trim()

  if (q.length < 3 || q.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Enter a location (3-100 characters)'
    })
  }

  const cacheKey = q.toLowerCase()
  const cached = cache.get(cacheKey)

  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  // Public Nominatim is not intended for autocomplete.
  // This endpoint is called only on explicit search.
  if (Date.now() - lastRequest < 1100) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Please wait before searching again'
    })
  }

  lastRequest = Date.now()

  const params = new URLSearchParams({
    q,
    format: 'jsonv2',
    addressdetails: '1',
    limit: '5'
  })

  try {
    const results = await $fetch<NominatimItem[]>(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: getOsmHeaders(),
        timeout: 10000
      }
    )

    const locations = results.map((item) => ({
      id: String(item.place_id),
      name: item.name || item.display_name.split(',')[0] || q,
      displayName: item.display_name,
      lat: Number(item.lat),
      lon: Number(item.lon)
    }))

    cache.set(cacheKey, {
      expires: Date.now() + 24 * 60 * 60 * 1000,
      data: locations
    })

    return locations
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Location search is temporarily unavailable'
    })
  }
})
