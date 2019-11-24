import { instance } from 'vue-stripe-elements-plus'
import VueCookies from 'vue-cookies'

import { createSetMutations } from '@/utils/store'
import { trackEvent } from '@/honeycomb'
import { payments } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    cardComplete: false,
    customerId: VueCookies.get('custID'),
    email: '',
    name: '',
    paying: false,
    paymentMethodId: VueCookies.get('pmID'),
    saveCard: false
  }),
  mutations: {
    ...createSetMutations([
      'cardComplete',
      'email',
      'name',
      'paying',
      'saveCard'
    ]),
    setPaymentMethodId (state, paymentMethodId) {
      VueCookies.set('pmID', paymentMethodId)
      state.paymentMethodId = paymentMethodId
    },
    setCustomerId (state, customerId) {
      VueCookies.set('custID', customerId)
      state.customerId = customerId
    }
  },
  actions: {
    async createPaymentMethod ({ commit, state: { name, email, saveCard } }, cardElement) {
      const { paymentMethod, error } = await instance
        .createPaymentMethod('card', cardElement, { billing_details: { name, email } })
      if (error) {
        throw error
      }
      if (saveCard) {
        commit('setPaymentMethodId', paymentMethod.id)
      }
      return paymentMethod
    },

    async getOptions ({ dispatch, state: { customerId, paymentMethodId } }, cardElement) {
      if (paymentMethodId && customerId) {
        return { paymentMethod: { id: paymentMethodId }, customerId }
      }
      const paymentMethod = await dispatch('createPaymentMethod', cardElement)
      return { paymentMethod }
    },

    async handleCardAction (context, paymentIntentClientSecret) {
      const { paymentIntent, error } = await instance
        .handleCardAction(paymentIntentClientSecret)
      if (error) {
        throw error
      }
      return paymentIntent
    },

    async onCheckoutResponse ({
      dispatch,
      state: { saveCard },
      rootState: { estimate }
    }, data) {
      if (data.success) {
        return { customerID: data.customerID }
      }
      if (data.requiresAction) {
        const paymentIntent = await dispatch('handleCardAction', data.paymentIntentClientSecret)
        const confirm = await payments.confirm({
          estimate: {
            id: estimate.id,
            carbon: estimate.carbon,
            options: { provider: this.provider }
          },
          paymentIntent: paymentIntent.id,
          saveCard: this.saveCard
        })
        return dispatch('onCheckoutResponse', confirm)
      }
      throw new Error('undefined state in handling server response')
    },

    async pay ({ commit, dispatch, state: { saveCard }, rootState: { estimate } }, cardElement) {
      trackEvent('paymentStarted', { 'app.estimateID': estimate.id }) //
      commit('setPaying', true)
      try {
        const { paymentMethod, customerId } = await dispatch('getOptions', cardElement)
        const options = {
          // TODO: repeated in onCheckoutResponse, consolidate
          estimate: {
            id: estimate.id,
            carbon: estimate.carbon,
            options: { provider: this.provider }
          },
          paymentMethod: paymentMethod.id,
          amount: estimate.price.cents,
          currency: estimate.price.currency,
          options: {
            saveCard: saveCard,
            ...customerId && { customerID: customerId }
          }
        }
        const checkout = await payments.checkout(options)
        await dispatch('onCheckoutResponse', checkout)
        trackEvent('paymentSuccessful', { 'app.estimateID': estimate.id })
        if (customerId) {
          commit('setCustomerId', customerId)
        }
        commit('setPaying', false)
      } catch (err) {
        const message = err.message || err
        trackEvent('paymentsFrontendError', {
          'app.estimateID': this.estimateID,
          errorMessage: message
        })
        commit('setPaying', false)
        throw message
      }
    }
  }
}
