import Vue from 'vue'
import { sync as syncStoreWithRouter } from 'vuex-router-sync'

import router from './router'
import store from './store'
import initPlugins from './plugins'
import initComponents from './components'
import App from './App'
import './assets/sass/main.scss'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
initPlugins()
initComponents()
syncStoreWithRouter(store, router)

new Vue({
  render: create => create(App),
  router,
  store
}).$mount('#app')
