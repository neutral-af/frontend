import isPlainObject from 'lodash/isPlainObject'
import isDate from 'lodash/isDate'
import isNumber from 'lodash/isNumber'

export const isValidFlightDeparture = isPlainObject
export const isValidFlightArrival = isPlainObject
export const isValidFlightDate = isDate
export const isValidFlightNumber = (value) => /([A-Z]+)([0-9]+)/.test(value)
export const isValidFlightPassengers = (value) => isNumber(value) && value >= 1

export const isValidFlight = ({ arrival, date, departure, flightNumber, passengers, type }) => {
  if (type === 'locations') {
    return isValidFlightDeparture(departure) && isValidFlightArrival(arrival) && isValidFlightPassengers(passengers)
  }
  if (type === 'number') {
    return isValidFlightDate(date) && isValidFlightNumber(flightNumber)
  }
}

export const areValidFlights = (flights) => flights.every(isValidFlight)
