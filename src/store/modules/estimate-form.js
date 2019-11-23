import { detailsByICAOs } from '@/api/airports'

const createFlight = (id) => ({
  id,
  arrival: null,
  date: new Date(),
  departure: null,
  flightNumber: '',
  passengers: 1,
  type: 'locations'
})

export default {
  namespaced: true,
  state: () => ({
    flights: {},
    currentFlight: 0,
    currentStep: 'departure'
  }),
  getters: {
    flightsCount: ({ flights }) => Object.keys(flights).length,
    flightsByICAO: ({ flights }) => Object.values(flights).map((flight) => {
      if (flight.type === 'locations') {
        return {
          departure: flight.departure ? { icao: flight.departure.ICAO } : null,
          arrival: flight.arrival ? { icao: flight.arrival.ICAO } : null,
          passengers: flight.passengers,
          type: flight.type
        }
      }
    })
  },
  mutations: {
    setFlights (state, flights) {
      state.flights = flights
    },
    addFlight (state) {
      const ids = Object.keys(state.flights)
      const id = ids.length > 0 ? Math.max(...ids) + 1 : 1
      state.flights = { ...state.flights, [id]: createFlight(id) }
    },
    removeFlight (state, id) {
      delete state.flights[id]
      state.flights = { ...state.flights }
    },
    updateFlight (state, { id, data }) {
      const flight = state.flights[id]
      state.flights = { ...state.flights, [id]: { ...flight, ...data } }
    },
    setCurrentFlight (state, currentFlight) {
      state.currentFlight = currentFlight
    },
    setCurrentStep (state, currentStep) {
      state.currentStep = currentStep
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
