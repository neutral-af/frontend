import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index'
import Checkout from './pages/Checkout'
import Success from './pages/Success'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/checkout', component: Checkout },
  { path: '/success', component: Success }
]

export default new VueRouter({
  routes
})
