import { estimate } from '@/api'

// import { state } from './estimate.mock'

export default {
  namespaced: true,
  state: () => ({
    creating: false,
    id: '',
    provider: '',
    carbon: 0,
    km: 0,
    price: null,
    step: 'flight'
  }),
  // state,
  mutations: {
    setCreating (st, creating) {
      st.creating = creating
    },
    setStep (st, step) {
      st.step = step
    },
    setData (st, data) {
      Object.assign(st, data)
    }
  },
  actions: {
    async create ({ commit, rootState: { userCurrency: currency, estimateForm: { flights } } }) {
      // TODO: add cancellation of request here
      commit('setCreating', true)
      try {
        const data = await estimate.create({ currency, flights })
        commit('setData', data.estimate.fromFlights)
        commit('setCreating', false)
      } catch (err) {
        commit('setCreating', false)
        throw err
      }
    }
    /*
    async update ({ commit, state: { id, provider }, rootState: { userCurrency: currency } }) {
      commit('setUpdating', true)
      try {
        const data = await estimate.update({ id, provider, currency })
        commit('setData', data.estimate.fromID)
        commit('setUpdating', false)
      } catch (err) {
        commit('setUpdating', false)
        throw err
      }
    }
    */
  }
}
