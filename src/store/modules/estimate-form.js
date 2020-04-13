import { createSetMutations } from '@/utils/store'
import { detailsByICAOs } from '@/api/airports'
import cloneDeep from 'lodash/cloneDeep'

const createFlight = () => ({
  arrival: null,
  date: new Date(),
  departure: null,
  flightNumber: '',
  passengers: 1,
  type: ''
})

const createId = (flights) => {
  const ids = Object.keys(flights)
  return ids.length > 0 ? Math.max(...ids) + 1 : 1
}

const createState = () => ({
  flights: {},
  newFlight: createFlight()
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
    ...createSetMutations(['flights']),
    addFlight (state, flight) {
      const id = createId(state.flights)
      state.flights = { ...state.flights, [id]: flight }
    },
    removeFlight (state, id) {
      delete state.flights[id]
      state.flights = { ...state.flights }
    },
    updateFlight (state, { id, data }) {
      const flight = state.flights[id]
      state.flights = { ...state.flights, [id]: { ...flight, ...data } }
    },
    updateNewFlight (state, data) {
      state.newFlight = { ...state.newFlight, ...data }
    },
    resetNewFlight (state) {
      state.newFlight = createFlight()
    },
    addReturnFlight (state, id) {
      const flight = cloneDeep(state.flights[id])
      const returnId = createId(state.flights)

      const { departure, arrival } = flight
      flight.arrival = departure
      flight.departure = arrival

      state.flights = { ...state.flights, [returnId]: flight }
    },
    reset (state) {
      const newState = createState()
      Object.assign(state, newState)
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
    }
  }
}
