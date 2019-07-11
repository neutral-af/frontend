import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import NotFound from './pages/NotFound'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/checkout', component: Checkout },
  { path: '/success', component: Success },
  { path: '*', component: NotFound }
]

export default new VueRouter({
  mode: 'history',
  routes
})
