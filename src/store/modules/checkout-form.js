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
  ])
}
