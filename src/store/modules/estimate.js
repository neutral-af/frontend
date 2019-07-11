export default {
  namespace: true,
  state: () => ({
    carbon: 0,
    currency: 'eur',
    estimateID: '',
    priceCents: 0
  }),
  mutations: {
    setData (st, data) {
      Object.assign(st, data)
    }
  }
}
