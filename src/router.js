import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Estimate from './pages/Estimate'
import EstimateHome from './pages/EstimateHome'
import EstimateFlightForm from './pages/EstimateFlightForm'
import EstimateCheckout from './pages/EstimateCheckout'
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
    component: Estimate,
    props: ({ query }) => ({ initialFlights: query.flights }),
    children: [{
      name: 'estimate-home',
      path: '',
      component: EstimateHome
    },
    {
      name: 'estimate-add-flight',
      path: 'add-flight',
      component: EstimateFlightForm
    }, {
      name: 'estimate-edit-flight',
      path: 'edit-flight/:id',
      component: EstimateFlightForm,
      props: true
    }, {
      name: 'estimate-checkout',
      path: 'checkout',
      component: EstimateCheckout
    }]
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
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 })
})
