import airports from '@/airports.json'

export const search = (rawQuery) => {
  const keys = ['name', 'city', 'country', 'faa', 'icao']
  const query = rawQuery.toLowerCase()
  return airports
    .filter(airport => keys.some(key => airport[key].toLowerCase().includes(query)))
    .slice(0, 10)
}

export const findByIcao = (icao) => airports.find(airport => icao === airport.icao)
