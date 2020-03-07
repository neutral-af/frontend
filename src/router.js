import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Estimate from './views/Estimate'
import Flights from './views/Flights'
import AddEditFlight from './views/AddEditFlight'
import CarbonInfo from './views/CarbonInfo'
import PriceInfo from './views/PriceInfo'
import Checkout from './views/Checkout'
import Success from './views/Success'
import About from './views/About'
import Privacy from './views/Privacy'
import NotFound from './views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/estimate',
    component: Estimate,
    props: ({ query }) => ({ initialFlights: query.flights }),
    children: [{
      name: 'flights',
      path: '',
      component: Flights
    }, {
      name: 'add-flight',
      path: 'add-flight',
      component: AddEditFlight
    }, {
      name: 'edit-flight',
      path: 'edit-flight/:id',
      component: AddEditFlight,
      props: true
    }, {
      name: 'carbon-info',
      path: 'carbon-info',
      component: CarbonInfo,
      props: true
    }, {
      name: 'price-info',
      path: 'price-info',
      component: PriceInfo,
      props: true
    }, {
      name: 'checkout',
      path: 'checkout',
      component: Checkout
    }, {
      name: 'success',
      path: 'success',
      component: Success
    }]
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
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
})
