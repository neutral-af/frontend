import { request } from 'graphql-request'
import airports from '@/airports.json'

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

export const payments = {
  async checkout ({ paymentMethod, amount, currency }) {
    const query = `
      mutation newCheckout($paymentMethod: String!, $amount: Int!, $currency: Currency!) {
        payment {
          checkout(paymentMethod:$paymentMethod, amount:$amount, currency:$currency) {
            success
            requiresAction
            paymentIntentClientSecret
          }
        }
      }
    `
    const response = await request(process.env.VUE_APP_BACKEND_URL, query, { paymentMethod, amount, currency })
    const { payment: { checkout: {
      success,
      requiresAction,
      paymentIntentClientSecret
    } } } = response

    return { success, requiresAction, paymentIntentClientSecret }
  },

  async confirm ({ paymentIntent }) {
    const query = `
      mutation confirmCheckout($paymentIntent: String!) {
        payment {
          confirm(paymentIntent:$paymentIntent) {
            success
            requiresAction
            paymentIntentClientSecret
          }
        }
      }
    `
    const response = await request(process.env.VUE_APP_BACKEND_URL, query, { paymentIntent })
    const { payment: { confirm: {
      success,
      requiresAction,
      paymentIntentClientSecret
    } } } = response

    return { success, requiresAction, paymentIntentClientSecret }
  }
}

export const fetchAirports = async (rawQuery) => {
  const keys = ['name', 'city', 'country', 'faa', 'icao']
  const query = rawQuery.toLowerCase()
  return airports
    .filter(airport => keys.some(key => airport[key].toLowerCase().includes(query)))
    .slice(0, 10)
}
