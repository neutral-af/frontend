import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Estimate from './views/Estimate'
import Flights from './views/Flights'
import AddEditFlight from './views/AddEditFlight'
import AddEditFlightType from './views/AddFlightType'
import AddEditFlightDeparture from './views/AddEditFlightDeparture'
import AddEditFlightArrival from './views/AddEditFlightArrival'
import AddEditFlightFlightNumber from './views/AddEditFlightNumber'
import AddEditFlightDate from './views/AddEditFlightDate'
import AddEditFlightPassengers from './views/AddEditFlightPassengers'
import Checkout from './views/Checkout'
import Success from './views/Success'
import About from './views/About'
import Privacy from './views/Privacy'
import NotFound from './views/NotFound'

Vue.use(VueRouter)

const getFlightFormChildren = namePrefix => [{
  name: `${namePrefix}-departure`,
  path: 'departure',
  component: AddEditFlightDeparture,
  props: true
}, {
  name: `${namePrefix}-arrival`,
  path: 'arrival',
  component: AddEditFlightArrival,
  props: true
}, {
  name: `${namePrefix}-number`,
  path: 'number',
  component: AddEditFlightFlightNumber,
  props: true
}, {
  name: `${namePrefix}-date`,
  path: 'date',
  component: AddEditFlightDate,
  props: true
}, {
  name: `${namePrefix}-passengers`,
  path: 'passengers',
  component: AddEditFlightPassengers,
  props: true
}]

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
      component: AddEditFlight,
      children: [
        {
          name: 'add-flight-type',
          path: 'type',
          component: AddEditFlightType,
          props: true
        },
        ...getFlightFormChildren('add-flight')
      ]
    }, {
      name: 'edit-flight',
      path: 'edit-flight/:id',
      component: AddEditFlight,
      props: true,
      children: getFlightFormChildren('edit-flight')
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
