import Vue from 'vue'
import Vuex, { Store } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import { DEFAULT_THEME } from '@/../constants'
import { localeToCurrency } from '@/utils/converters'
import { createSetMutations } from '@/utils/store'
import estimate from '@/store/modules/estimate'
import estimateForm from '@/store/modules/estimate-form'
import checkoutForm from '@/store/modules/checkout-form'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'
// const persistedState = createPersistedState({
//   reducer: ({ estimate }) => estimate
// })

export default new Store({
  state: () => ({
    theme: DEFAULT_THEME,
    userCurrency: localeToCurrency(window.navigator.language)
  }),
  mutations: createSetMutations(['theme', 'userCurrency']),
  modules: {
    checkoutForm,
    estimateForm,
    estimate
  },
  // plugins: [persistedState],
  strict: strict
})
