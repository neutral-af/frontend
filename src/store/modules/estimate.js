import { createSetMutations } from '@/utils/store'
import { create } from '@/api/estimate' // update

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
    ...createSetMutations(['creating']),
    reset (state) {
      const newState = createState()
      Object.assign(state, newState)
    },
    set (state, data) {
      Object.assign(state, data)
    }
  },
  actions: {
    async create ({ commit, rootState: { userCurrency: currency, estimateForm: { flights } } }) {
      // TODO: add cancellation of request here
      commit('setCreating', true)
      try {
        const data = await create({ currency, flights })
        commit('set', data.estimate.fromFlights)
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
        const data = await update({ id, provider, currency })
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
