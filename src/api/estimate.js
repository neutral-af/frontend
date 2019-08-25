import request from './request'

const prepareFlight = ({ arrival, date, departure, flightNumber, type }) => {
  if (type === 'locations') {
    return { departure: departure.icao, arrival: arrival.icao }
  }
  return { flightNumber, date }
}

export const create = async ({ flights, currency }) => {
  const query = `
    query newEstimate($flights: [Flight!]!, $currency: Currency) {
      estimate {
        fromFlights(flights:$flights) {
          id
          carbon
          provider
          price(currency:$currency) {
            currency
            cents
            breakdown { name cents currency }
          }
        }
      }
    }
  `
  return request(query, {
    currency,
    flights: flights.map(prepareFlight)
  })
}

export const update = async ({ id, provider, currency }) => {
  const query = `
    query newEstimate($id: ID!, $provider: Provider!, $currency: Currency) {
      estimate {
        fromID(id: $id, provider: $provider) {
          id
          carbon
          provider
          price(currency:$currency) {
            currency
            cents
            breakdown { name cents currency }
          }
        }
      }
    }
  `
  return request(query, { id, provider, currency })
}
