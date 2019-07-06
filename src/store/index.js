import Vuex, { Store } from 'vuex'

import estimateForm from '~/store/estimate-form'

export default (Vue, { appOptions }) => {
  Vue.use(Vuex)
  appOptions.store = new Store({
    modules: {
      estimateForm
    }
  })
}
