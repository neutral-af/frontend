import airports from '@/airports.json'

export const search = (query) => {
  const keys = ['name', 'city', 'country', 'faa', 'icao']
  let filtered = airports
  if (query) {
    const lowercased = query.toLowerCase()
    filtered = filtered.filter(airport => keys.some(key => airport[key].toLowerCase().includes(lowercased)))
  }
  return filtered.slice(0, 10)
}

export const findByIcao = (icao) => airports.find(airport => icao === airport.icao)
