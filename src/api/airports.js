import Fuse from 'fuse.js'

import airports from '@/airports.json'

const fuse = new Fuse(airports, {
  keys: [
    { name: 'name', weight: 0.6 },
    { name: 'faa', weight: 0.9 }
    // { name: 'city', weight: 0.4 },
    // { name: 'country', weight: 0.3 }
  ]
})

export const search = (query) => {
  if (!query) return []

  const lowercased = query.toLowerCase()

  return fuse.search(lowercased).slice(0, 10)
}

export const findByIcao = (icao) => airports.find(airport => icao === airport.icao)
