import { createSetMutations } from '@/utils/store'

export default {
  namespaced: true,
  state: () => ({
    cardComplete: false
  }),
  mutations: createSetMutations(['cardComplete'])
}
