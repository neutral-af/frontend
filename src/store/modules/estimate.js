import { estimate } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    loading: false,
    id: 0,
    provider: '',
    carbon: 1,
    price: {
      currency: 'EUR',
      cents: 20,
      breakdown: []
    }
  }),
  mutations: {
    setLoading (st, loading) {
      st.loading = loading
    },
    setData (st, data) {
      Object.assign(st, data)
    }
  },
  actions: {
    async create ({ commit, rootState }) {
      const currency = rootState.userCurrency
      const flights = rootState.estimateForm.flights
      commit('setLoading', true)
      try {
        const data = await estimate.create({ currency, flights })
        commit('setData', data.estimate.fromFlights)
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        throw err
      }
    },
    async update ({ commit, state, rootState }) {
      const currency = rootState.userCurrency
      commit('setLoading', true)
      try {
        const data = await estimate.update({ id: state.id, provider: state.provider, currency })
        commit('setData', data.estimate.fromID)
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        throw err
      }
    }
  }
}
