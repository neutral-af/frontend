import request from './request'

export const search = async (q) => {
  if (!q || q.length < 3) return

  const query = `
      query findAirport($query: String!) {
        airport {
          search(query:$query) {
            name
            ICAO
            IATA
            city
            country
          }
        }
      }
    `
  return (await request(query, { query: q })).airport.search
}

export const detailsByICAOs = async (departure, arrival) => {
  const query = `
      query airportDetails($departure: String!, $arrival: String!) {
        departure: airport {
          fromICAO(code:$departure) {
            name
            ICAO
            IATA
            city
            country
          }
        }
        arrival: airport {
          fromICAO(code:$arrival) {
            name
            ICAO
            IATA
            city
            country
          }
        }
      }
    `
  const response = await request(query, { departure, arrival })
  return {
    departure: response.departure.fromICAO,
    arrival: response.arrival.fromICAO
  }
}
