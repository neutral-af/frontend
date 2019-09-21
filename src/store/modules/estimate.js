import { estimate } from '@/api'

// import { state } from './estimate.mock'

export default {
  namespaced: true,
  state: () => ({
    loading: false,
    id: '',
    provider: '',
    carbon: 0,
    price: null
  }),
  // state,
  mutations: {
    setLoading (st, loading) {
      st.loading = loading
    },
    setData (st, data) {
      Object.assign(st, data)
    }
  },
  actions: {
    async create ({ commit, rootState: { userCurrency: currency, estimateForm: { flights } } }) {
      // TODO: add cancellation of request here
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
    async update ({ commit, state: { id, provider }, rootState: { userCurrency: currency } }) {
      commit('setLoading', true)
      try {
        const data = await estimate.update({ id, provider, currency })
        commit('setData', data.estimate.fromID)
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        throw err
      }
    }
  }
}
