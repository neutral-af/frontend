import { isValidFlight } from '@/validators'
import request from './request'

const duplicateByPassengers = (flights, flight) => {
  if (flight.passengers > 1) {
    const added = Array.from(Array(flight.passengers - 1)).fill(flight)
    return [...flights, ...added]
  }
  return flights
}

const restrictByType = ({ arrival, date, departure, flightNumber, type }) => {
  if (type === 'locations') {
    return { departure: departure.icao, arrival: arrival.icao }
  }
  return { flightNumber, date }
}

const prepareFlights = flights => flights
  .filter(isValidFlight)
  .reduce(duplicateByPassengers, flights)
  .map(restrictByType)

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
  return request(query, { currency, flights: prepareFlights(Object.values(flights)) })
}

export const update = async ({ id, provider, currency }) => {
  const query = `
    query updateEstimate($id: ID!, $provider: Provider!, $currency: Currency) {
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
