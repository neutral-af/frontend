import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'
import Buefy from 'buefy'

import router from './router'
import store from './store'
import App from './App'
import RoundedButton from './components/atoms/RoundedButton'
import './assets/sass/main.scss'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.component('RoundedButton', RoundedButton)
Vue.use(VueCookies)
Vue.use(VueMeta)
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
  defaultUseHtml5Validation: false
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
