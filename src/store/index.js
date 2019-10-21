import Vue from 'vue'
import Vuex, { Store } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import { getCurrencyFromLocale } from '@/utils'
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
    userCurrency: getCurrencyFromLocale(window.navigator.language)
  }),
  mutations: {
    setUserCurrency (st, val) {
      st.userCurrency = val
    }
  },
  modules: {
    checkoutForm,
    estimateForm,
    estimate
  },
  // plugins: [persistedState],
  strict: strict
})
