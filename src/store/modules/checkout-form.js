import { createSetMutations } from '@/utils/store'

export default {
  namespaced: true,
  state: () => ({
    cardComplete: false,
    email: '',
    name: '',
    paying: false,
    saveCard: false
  }),
  mutations: createSetMutations([
    'cardComplete',
    'email',
    'name',
    'paying',
    'saveCard'
  ]),
  actions: {
    async pay ({ commit, dispatch, state: { paying, saveCard }, rootState: { estimate: { price } } }) {
      if (paying) {
        return
      }
      commit('setPaying', true)
      try {
        commit('setPaying', false)
      } catch (err) {
        commit('setPaying', false)
        throw err
      }
    }
  }
}
