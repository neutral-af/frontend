import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Estimate from './pages/Estimate'
import Success from './pages/Success'
import About from './pages/About'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/estimate',
    name: 'estimate',
    component: Estimate,
    props: ({ query }) => ({ initialFlights: query.flights })
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

export default new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: 'is-active',
  mode: 'history',
  routes
})
