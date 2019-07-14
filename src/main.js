import Vue from 'vue'
import VueCookies from 'vue-cookies'
// import VeeValidate from 'vee-validate'
import Buefy from 'buefy'

import router from './router'
import store from './store'
import App from './App'
import './assets/sass/main.scss'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.use(VueCookies)
// Vue.use(VeeValidate)
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
