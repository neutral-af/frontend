import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { localeToCurrency } from '@/utils/converters'
import { createSetMutations } from '@/utils/store'
import estimate from '@/store/modules/estimate'
import estimateForm from '@/store/modules/estimate-form'
import checkoutForm from '@/store/modules/checkout-form'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

export default new Store({
  state: () => ({
    isMobile: false,
    userCurrency: localeToCurrency(window.navigator.language)
  }),
  mutations: createSetMutations([
    'isMobile',
    'userCurrency'
  ]),
  modules: {
    checkoutForm,
    estimateForm,
    estimate
  },
  plugins: [
    createPersistedState({
      paths: ['userCurrency']
    })
  ],
  strict: strict
})
