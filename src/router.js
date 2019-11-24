import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Estimate from './views/Estimate'
import EstimateHome from './views/EstimateHome'
import EstimateFlightForm from './views/EstimateFlightForm'
import EstimateCheckout from './views/EstimateCheckout'
import EstimateSuccess from './views/EstimateSuccess'
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
    name: 'estimate',
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
    }, {
      name: 'estimate-success',
      path: 'success',
      component: EstimateSuccess
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
