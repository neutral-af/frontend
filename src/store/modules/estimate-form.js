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
    flights: {
      1: createFlight(1)
    }
  }),
  getters: {
    getFlightsByICAO (state) {
      return Object.values(state.flights).map(e => {
        if (e.type === 'locations') {
          return {
            departure: { icao: e.departure.ICAO },
            arrival: { icao: e.arrival.ICAO },
            passengers: e.passengers,
            type: e.type
          }
        }
      })
    }
  },
  mutations: {
    setFlights (state, flights) {
      state.flights = flights
    },
    addFlight (state) {
      const ids = Object.keys(state.flights).map((id) => parseInt(id, 10))
      const id = Math.max(...ids) + 1
      state.flights = { ...state.flights, [id]: createFlight(id) }
    },
    removeFlight (state, id) {
      delete state.flights[id]
      state.flights = { ...state.flights }
    },
    updateFlight (state, { id, data }) {
      const flight = state.flights[id]
      state.flights = {
        ...state.flights, [id]: { ...flight, ...data }
      }
    }
  },
  actions: {
    async loadFlights ({ commit }, inputFlights) {
      const flights = await inputFlights.reduce(async (obj, f, index) => {
        if (f.type === 'locations') {
          const { departure, arrival } = await detailsByICAOs(f.departure.icao, f.arrival.icao)
          obj[index] = Object.assign({}, f, { departure, arrival })
          return obj
        }
      }, {})

      commit('setFlights', flights)
    }
  }
}
