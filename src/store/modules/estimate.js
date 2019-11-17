import { estimate } from '@/api'

export const createState = () => ({
  creating: false,
  id: '',
  provider: '',
  carbon: 0,
  km: 0,
  price: null
})

export default {
  namespaced: true,
  state: createState,
  getters: {
    hasEstimate: ({ id }) => !!id
  },
  mutations: {
    reset (state) {
      const newState = createState()
      Object.assign(state, newState)
    },
    setCreating (state, creating) {
      state.creating = creating
    },
    setData (state, data) {
      Object.assign(state, data)
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
    /* TODO: use update when BE will support it
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
