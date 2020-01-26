export const isValidFlightDate = (value) => value instanceof Date

export const isValidFlightNumber = (value) => /([A-Z]+)([0-9]+)/.test(value)

export const isValidFlight = ({ arrival, date, departure, flightNumber, passengers, type }) => {
  if (type === 'locations') {
    return !!departure && !!arrival && passengers
  }
  return !!date && !!flightNumber
}

export const areValidFlights = (flights) => flights.every(isValidFlight)
