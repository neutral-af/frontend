import { createEstimate } from '@/api'

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
      const currency = rootState.userCurrency
      commit('setFetching', true)
      try {
        const data = await createEstimate({ flights, currency })
        console.log('query response!', data) // eslint-disable-line
        commit('setData', data.estimate.fromFlights)
        commit('setFetching', false)
      } catch (err) {
        commit('setFetching', false)
        throw err
      }
    },
    async update ({ commit, dispatch, state }) {
      // TODO
    }
    // async fetchExistingEstimate (estimateID) {

    // }
  }
}
