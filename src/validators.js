export const isValidFlight = ({ arrival, date, departure, flightNumber, passengers, type }) => {
  if (type === 'locations') {
    return !!departure && !!arrival && passengers
  }
  return !!date && !!flightNumber
}
