import Vue from 'vue'
import VueCookies from 'vue-cookies'
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Buefy from 'buefy'

import router from './router'
import store from './store'
import App from './App'
import './assets/sass/main.scss'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.use(VueCookies)
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// setInteractionMode('eager')

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
