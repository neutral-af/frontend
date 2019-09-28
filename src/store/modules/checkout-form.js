import { instance } from 'vue-stripe-elements-plus'

import { payments } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    cardComplete: false,
    cardElement: null,
    email: '',
    name: '',
    paying: false,
    saveCard: false
  }),
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setEmail (state, email) {
      state.email = email
    },
    setSaveCard (state, saveCard) {
      state.saveCard = saveCard
    },
    setCardComplete (state, complete) {
      state.cardComplete = complete
    },
    setPaying (state, paying) {
      state.paying = paying
    },
    setCardElement (state, cardElement) {
      state.cardElement = cardElement
    }
  },
  actions: {
    async createPaymentMethod ({ state: { cardElement, name, email, saveCard } }) {
      const { paymentMethod, error } = await instance.createPaymentMethod(
        'card',
        cardElement,
        { billing_details: { name, email } }
      )
      if (error) {
        throw error
      }
      if (saveCard) {
        this.$cookies.set('pmID', paymentMethod.id)
      }
      return paymentMethod
    },

    // Use Stripe.js to handle required card action
    async handleCardAction (context, paymentIntentClientSecret) {
      const { paymentIntent, error } = await instance.handleCardAction(paymentIntentClientSecret)
      if (error) {
        throw error
      }
      return paymentIntent
    },

    async getOptions ({ dispatch }) {
      if (this.hasPreviouslySaved) {
        return {
          paymentMethod: {
            id: this.previouslySavedDetails.paymentMethod
          },
          customerID: this.previouslySavedDetails.customer
        }
      }
      return {
        paymentMethod: await dispatch('createPaymentMethod')
      }
    },

    async onCheckoutResponse (
      { dispatch, state: { saveCard } },
      { success, requiresAction, paymentIntentClientSecret, customerID }
    ) {
      if (success) {
        return
      }
      if (requiresAction) {
        const paymentIntent = await dispatch('handleCardAction', paymentIntentClientSecret)
        const confirm = await payments.confirm({ paymentIntent: paymentIntent.id, saveCard })
        return dispatch('onCheckoutResponse', confirm)
      }
      throw new Error('undefined state in handling server response')
    },

    // The Stripe handler methods below are modified from the docs:
    // https://stripe.com/docs/payments/payment-intents/quickstart#manual-confirmation-flow
    async pay ({ commit, dispatch, state: { paying, saveCard }, rootState: { estimate: { price } } }) {
      if (paying) {
        return
      }
      commit('setPaying', true)
      try {
        const { paymentMethod, customerID } = await dispatch('getOptions')
        const checkout = await payments.checkout({
          paymentMethod: paymentMethod.id,
          amount: price.cents,
          currency: price.currency,
          options: {
            saveCard: saveCard,
            ...customerID && { customerID }
          }
        })
        await dispatch('onCheckoutResponse', checkout)
        if (customerID) {
          this.$cookies.set('custID', customerID)
        }
        commit('setPaying', false)
      } catch (err) {
        commit('setPaying', false)
        throw err
      }
    }
  }
}
