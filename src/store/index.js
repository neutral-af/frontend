import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import estimate from './modules/estimate'
import estimateForm from './modules/estimate-form'
import localeToCurrency from '../../../lib/localeToCurrency'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({
  reducer: ({ estimate }) => estimate
})

export default new Store({
  state: () => ({
    userCurrency: localeToCurrency(window.navigator.language)
  }),
  mutations: {
    setUserCurrency (st, val) {
      st.userCurrency = val
    }
  },
  modules: {
    estimateForm,
    estimate
  },
  plugins: [persistedState],
  strict: strict
})
