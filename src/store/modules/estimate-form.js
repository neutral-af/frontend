const createFlight = (id) => ({
  id,
  type: 'locations',
  number: '',
  from: null,
  to: null,
  date: new Date(),
  passengers: 1
})

export default {
  namespaced: true,
  state: () => ({
    flights: [createFlight(1)]
  }),
  mutations: {
    addFlight (state) {
      const id = state.flights.length + 1
      const flight = createFlight(id)
      state.flights.push(flight)
    },
    removeFlight (state, id) {
      const index = state.flights.findIndex(flight => flight.id === id)
      state.flights.splice(index, 1)
    },
    updateFlight (state, { id, data }) {
      const index = state.flights.findIndex(flight => flight.id === id)
      Object.assign(state.flights[index], data)
    }
  },
  getters: {
    getFlight: state => id => state.flights.find(flight => flight.id === id)
  }
}
