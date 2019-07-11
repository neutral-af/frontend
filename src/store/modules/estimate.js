import { request as graphQLRequest } from 'graphql-request'

export default {
  namespaced: true,
  state: () => ({
    fetching: false,
    id: '',
    carbon: 0,
    price: {
      currency: '',
      cents: 0,
      breakdown: []
    }
  }),
  mutations: {
    setFetching (st, fetching) {
      st.fetching = fetching
    },
    setData (st, data) {
      Object.assign(st, data)
    }
  },
  actions: {
    async create ({ commit, rootState }, { flights }) {
      commit('setFetching', true)
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

      const currency = rootState.userCurrency

      const estimateData = await graphQLRequest(
        process.env.VUE_APP_BACKEND_URL,
        query,
        { flights, currency }
      )
      console.log('query response!', estimateData) // eslint-disable-line
      commit('setData', estimateData.estimate.fromFlights)
      commit('setFetching', false)
    },
    async update ({ commit, dispatch, state }) {
      // TODO
    }
    // async fetchExistingEstimate (estimateID) {

    // }
  }
}
