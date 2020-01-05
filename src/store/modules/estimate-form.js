import { createSetMutations } from '@/utils/store'
import { detailsByICAOs } from '@/api/airports'

const createFlight = () => ({
  arrival: null,
  date: null,
  departure: null,
  flightNumber: '',
  passengers: 1,
  type: ''
})

export default {
  namespaced: true,
  state: () => ({
    flights: {},
    newFlight: createFlight()
  }),
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
    addFlight (state, data) {
      const ids = Object.keys(state.flights)
      const id = ids.length > 0 ? Math.max(...ids) + 1 : 1
      state.flights = { ...state.flights, [id]: data }
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
