import { estimate } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    fetching: false,
    id: '',
    provider: '',
    carbon: 1,
    price: {
      currency: 'EUR',
      cents: 200,
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
        const data = await estimate.create({ flights, currency })
        commit('setData', data.estimate.fromFlights)
        commit('setFetching', false)
      } catch (err) {
        commit('setFetching', false)
        throw err
      }
    },
    async update ({ commit, state, rootState }) {
      const currency = rootState.userCurrency
      commit('setFetching', true)
      try {
        const data = await estimate.update({ id: state.id, provider: state.provider, currency })
        commit('setData', data.estimate.fromID)
        commit('setFetching', false)
      } catch (err) {
        commit('setFetching', false)
        throw err
      }
    }
  }
}
