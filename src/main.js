import Vue from 'vue'
import { sync as syncStoreWithRouter } from 'vuex-router-sync'

import './polyfills'
import router from './router'
import store from './store'
import initPlugins from './plugins'
import initDirectives from './directives'
import initIcons from './icons'
import initComponents from './components'
import App from './App'
import './assets/css/custom.css'
import './assets/css/fonts.css'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
initPlugins()
initDirectives()
initIcons()
initComponents()
syncStoreWithRouter(store, router)

new Vue({
  render: create => create(App),
  router,
  store
}).$mount('#app')
