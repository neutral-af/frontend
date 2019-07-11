import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import estimate from './modules/estimate'
import estimateForm from './modules/estimate-form'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({
  reducer: ({ estimate }) => estimate
})

export default new Store({
  modules: {
    estimateForm,
    estimate
  },
  plugins: [persistedState],
  strict: strict
})
