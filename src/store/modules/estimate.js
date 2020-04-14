import cloneDeep from 'lodash/cloneDeep'

import * as utils from '@/utils/store'
import { detailsByICAOs } from '@/api/airports'
import { create, update } from '@/api/estimate'

const createFormFlight = () => ({
  arrival: null,
  date: new Date(),
  departure: null,
  flightNumber: '',
  passengers: 1,
  type: ''
})

export const createState = () => ({
  creating: false,
  estimate: null,
  flights: {},
  formFlight: null,
  updating: false
})

export default {
  namespaced: true,
  state: createState,
  getters: {
    flightsCount: ({ flights }) => Object.keys(flights).length,
    flightById: ({ flights }) => id => flights[id],
    flightsByICAO: ({ flights }) => Object.values(flights).map((flight) => {
      const { type } = flight
      const byICAO = { type }
      if (type === 'locations') {
        return {
          ...byICAO,
          departure: flight.departure ? { icao: flight.departure.ICAO } : null,
          arrival: flight.arrival ? { icao: flight.arrival.ICAO } : null,
          passengers: flight.passengers
        }
      }
    })
  },
  mutations: {
    ...utils.createSetMutations([
      'creating',
      'estimate',
      'flights',
      'updating'
    ]),
    createFormFlight (state, data) {
      state.formFlight = { ...createFormFlight(), ...data }
    },
    updateFormFlight (state, data) {
      state.formFlight = { ...state.formFlight, ...data }
    },
    resetFormFlight (state) {
      state.formFlight = null
    },
    resetEstimate (state) {
      state.estimate = null
    },
    resetFlights (state) {
      state.flights = {}
    }
  },
  actions: {
    async loadFlights ({ commit }, initialFlights) {
      const promises = initialFlights
        .filter(flight => (
          flight.type === 'locations' && flight.passengers &&
          flight.departure && flight.departure.icao &&
          flight.arrival && flight.arrival.icao
        ))
        .map((flight) => detailsByICAOs(flight.departure.icao, flight.arrival.icao))
      const list = await Promise.all(promises)

      const flights = list.reduce((acc, flight, index) => {
        const id = index + 1
        const withId = { ...initialFlights[index], ...flight, id }
        acc[id] = withId
        return acc
      }, {})

      commit('setFlights', flights)
    },
    async handleError ({ dispatch }, err) {
      if (err.response && err.response.errors && err.response.errors.length > 0) {
        const [{ message }] = err.response.errors
        dispatch('showNotification', { message }, { root: true })
      }
      if (process.env.NODE_ENV === 'development') {
        throw err
      }
    },
    async create ({ commit, dispatch, rootState: { userCurrency: currency } }, flights) {
      // TODO: add cancellation of request here
      commit('setCreating', true)
      try {
        const { estimate: { fromFlights } } = await create({ currency, flights })
        commit('setEstimate', fromFlights)
        commit('setFlights', flights)
        commit('setCreating', false)
      } catch (err) {
        commit('setCreating', false)
        return dispatch('handleError', err)
      }
    },
    async update ({ commit, dispatch, state: { estimate }, rootState: { userCurrency: currency } }, flights) {
      // TODO: add cancellation of request here
      commit('setUpdating', true)
      try {
        const { estimate: { fromID } } = await update({
          currency,
          id: estimate.id,
          provider: estimate.provider
        })
        commit('setEstimate', fromID)
        commit('setFlights', flights)
        commit('setUpdating', false)
      } catch (err) {
        commit('setUpdating', false)
        return dispatch('handleError', err)
      }
    },
    async addFlight ({ dispatch, state: { flights } }, flight) {
      const id = utils.createId(flights)
      return dispatch('create', { ...flights, [id]: flight })
    },
    async addReturnFlight ({ dispatch, state: { flights } }, id) {
      const flight = flights[id]
      if (!flight) {
        return
      }
      const returnFlight = cloneDeep(flights[id])
      const returnId = utils.createId(flights)
      const { departure, arrival } = returnFlight
      Object.assign(returnFlight, { arrival: departure, departure: arrival })
      return dispatch('create', { ...flights, [returnId]: returnFlight })
    },
    async editFlight ({ dispatch, state: { flights } }, { id, flight }) {
      return dispatch('create', { ...flights, [id]: flight })
    },
    async removeFlight ({ dispatch, state: { flights } }, id) {
      const filtered = { ...flights }
      delete filtered[id]
      return dispatch('create', filtered)
    }
  }
}
