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
    },
    currentFlight: 1,
    currentStep: 'departure'
  }),
  mutations: {
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
    },
    setCurrentFlight (state, currentFlight) {
      state.currentFlight = currentFlight
    },
    setCurrentStep (state, currentStep) {
      state.currentStep = currentStep
    }
  }
}
