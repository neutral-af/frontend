
export default {
  namespaced: true,
  state: () => ({
    cardComplete: false
  }),
  mutations: {
    setCardComplete (st, complete) {
      st.cardComplete = complete
    }
  }
}
