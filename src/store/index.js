import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import estimateForm from './modules/estimate-form'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Store({
  modules: {
    estimateForm
  },
  strict: debug
})
