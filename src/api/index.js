import { request } from 'graphql-request'

export const createEstimate = async ({ flights, currency }) => {
  const query = `
    query newEstimate($flights: [Flight!]!, $currency: Currency) {
      estimate {
        fromFlights(flights:$flights) {
          id
          carbon
          price(currency:$currency) {
            currency
            cents
            breakdown { name cents currency }
          }
        }
      }
    }
  `
  return request(process.env.VUE_APP_BACKEND_URL, query, { flights, currency })
}
