import { createSetMutations } from '@/utils/store'

const createState = () => ({
  cardComplete: false,
  email: '',
  name: '',
  paying: false,
  saveCard: false
})

export default {
  namespaced: true,
  state: createState,
  mutations: {
    ...createSetMutations([
      'cardComplete',
      'email',
      'name',
      'paying',
      'saveCard'
    ]),
    reset (state) {
      Object.assign(state, createState())
    }
  }
}
