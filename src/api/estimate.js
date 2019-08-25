import request from './request'

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
  return request(query, { flights, currency })
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
  return request(process.env.VUE_APP_BACKEND_URL, query, { id, provider, currency })
}
