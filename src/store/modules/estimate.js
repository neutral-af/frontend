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
    ...utils.createSetMutations(['creating', 'flights', 'updating']),
    setEstimate (state, estimate) {
      state.estimate = estimate
    },
    removeFlight (state, id) {
      delete state.flights[id]
      state.flights = { ...state.flights }
    },
    updateFlight (state, { id, data }) {
      const flight = state.flights[id]
      state.flights = { ...state.flights, [id]: { ...flight, ...data } }
    },
    createFormFlight (state, data) {
      state.formFlight = { ...createFormFlight(), ...data }
    },
    updateFormFlight (state, data) {
      state.formFlight = { ...state.formFlight, ...data }
    },
    resetFormFlight (state) {
      state.formFlight = null
    },
    addReturnFlight (state, id) {
      const flight = cloneDeep(state.flights[id])
      const returnId = utils.createId(state.flights)
      const { departure, arrival } = flight
      flight.arrival = departure
      flight.departure = arrival
      state.flights = { ...state.flights, [returnId]: flight }
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
    async create ({ commit, rootState: { userCurrency: currency } }, flights) {
      // TODO: add cancellation of request here
      commit('setCreating', true)
      try {
        const data = await create({ currency, flights })
        commit('setEstimate', data.estimate.fromFlights)
        commit('setFlights', flights)
        commit('setCreating', false)
      } catch (err) {
        commit('setCreating', false)
        throw err
      }
    },
    async update ({ commit, state: { estimate }, rootState: { userCurrency: currency } }, flights) {
      // TODO: add cancellation of request here
      commit('setUpdating', true)
      try {
        const data = await update({ id: estimate.id, provider: estimate.provider, currency })
        commit('setEstimate', data.estimate.fromID)
        commit('setFlights', flights)
        commit('setUpdating', false)
      } catch (err) {
        commit('setUpdating', false)
        throw err
      }
    },
    async addFlight ({ dispatch, state: { flights } }, flight) {
      const id = utils.createId(flights)
      return dispatch('create', { ...flights, [id]: flight })
    },
    async editFlight ({ dispatch, state: { flights } }, { id, flight }) {
      return dispatch('create', { ...flights, [id]: flight })
    }
  }
}
