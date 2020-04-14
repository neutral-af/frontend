import { isValidFlight } from '@/utils/validators'
import request from './request'

const duplicateByPassengers = (flights, flight) => {
  if (flight.passengers > 1) {
    const added = Array.from(Array(flight.passengers - 1)).fill(flight)
    return [...flights, ...added]
  }
  return flights
}

const restrictByType = ({ arrival, date, departure, flightNumber, type }) => (
  type === 'locations'
    ? { departure: departure.ICAO, arrival: arrival.ICAO }
    : { flightNumber, date }
)

const prepareFlights = flights => {
  const flgts = Object.values(flights)
  return flgts
    .filter(isValidFlight)
    .reduce(duplicateByPassengers, flgts)
    .map(restrictByType)
}

export const create = async ({ currency, flights }) => {
  const query = `
    query newEstimate($flights: [Flight!]!, $currency: Currency) {
      estimate {
        fromFlights(flights:$flights) {
          id
          carbon
          km
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
  return request(query, { currency, flights: prepareFlights(flights) })
}

export const update = async ({ id, provider, currency }) => {
  const query = `
    query updateEstimate($id: ID!, $provider: Provider!, $currency: Currency) {
      estimate {
        fromID(id: $id, provider: $provider) {
          id
          carbon
          km
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
