import { createSetMutations } from '@/utils/store'
import { create, update } from '@/api/estimate'

import createState from '@/mocks/estimate'

// export const createState = () => ({
//   carbon: 0,
//   creating: false,
//   id: '',
//   km: 0,
//   price: null,
//   provider: '',
//   updating: false
// })

export default {
  namespaced: true,
  state: createState,
  getters: {
    hasEstimate: ({ id }) => !!id
  },
  mutations: {
    ...createSetMutations(['creating', 'updating']),
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
    },
    async update ({ commit, state: { id, provider }, rootState: { userCurrency: currency } }) {
      // TODO: add cancellation of request here
      commit('setUpdating', true)
      try {
        const data = await update({ id, provider, currency })
        commit('set', data.estimate.fromID)
        commit('setUpdating', false)
      } catch (err) {
        commit('setUpdating', false)
        throw err
      }
    }
  }
}
