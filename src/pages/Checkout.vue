<template>
  <section class="hero is-primary is-bold is-fullheight checkout">
    <div class="hero-body">
      <div class="columns is-centered is-vcentered">
        <div class="column is-two-thirds-tablet is-half-desktop is-one-third-fullhd">
          <h1 class="title">
            Purchase your offsets
          </h1>

          <div class="box">
            <h2
              v-if="error"
              class="subtitle has-text-danger"
            >
              {{ error }}
            </h2>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Name</label>
                <div class="control has-icons-left has-icons-right" />
              </div>
              <div class="field-body">
                <input
                  v-model.trim="cardholderName"
                  placeholder="your full name"
                  type="text"
                  class="input"
                  :class="{ 'is-danger': !cardholderNameValid, 'is-success': cardholderNameValid }"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user" />
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check" />
                </span>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right" />
              </div>
              <div class="field-body">
                <input
                  v-model.trim="cardholderEmail"
                  placeholder="your email address"
                  type="email"
                  class="input"
                  :class="{ 'is-danger': !cardholderEmailValid, 'is-success':cardholderEmailValid }"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope" />
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Carbon</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      class="input is-static"
                      :value="carbonString"
                      readonly
                    >
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Price</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      class="input is-static"
                      :value="priceLocal"
                      readonly
                    >
                  </p>
                </div>
              </div>
            </div>

            <div class="field box">
              <card
                ref="card-element"
                :stripe="stripeKey"
                :class="{ complete }"
                :options="stripeOptions"
                @change="complete = $event.complete"
              />
            </div>

            <div class="field">
              <div class="control">
                <label class="checkbox is-size-7">
                  <input
                    v-model="saveCard"
                    type="checkbox"
                    disabled
                  >
                  <!-- TODO: enable this -->
                  Please save my card to skip this process in the future
                </label>
              </div>
            </div>

            <div class="field">
              <div class="control has-text-centered">
                <button
                  class="button is-info is-medium"
                  :disabled="!formValid"
                  :class="{ 'is-loading': processing }"
                  @click="pay"
                >
                  Pay now
                </button>
                <div
                  class="content is-size-7"
                  style="margin-top: 1em"
                >
                  Payment will be processed securely by Stripe.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { Card, instance } from 'vue-stripe-elements-plus'
import { trackEvent } from '../honeycomb'

const stateKeys = ['carbon', 'currency', 'estimateId', 'priceCents']

export default {
  name: 'Checkout',
  components: { Card },
  data () {
    return {
      cardholderName: '',
      cardholderEmail: '',
      saveCard: false,
      error: '',
      complete: false, // form is completely filled out
      processing: false,
      stripeKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
      stripeOptions: {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      }
    }
  },
  computed: {
    ...mapState('estimate', stateKeys),
    priceLocal () {
      return (this.priceCents / 100).toLocaleString(navigator.languages[0], {
        style: 'currency',
        currency: this.currency,
        currencyDisplay: 'symbol'
      })
    },
    carbonString () {
      return `${this.carbon} kg`
    },
    cardholderNameValid () {
      return !!this.cardholderName
    },
    cardholderEmailValid () {
      return !!this.cardholderEmail
    },
    formValid () {
      return this.complete && this.cardholderNameValid && this.cardholderEmailValid
    }
  },
  created () {
    if (stateKeys.some(value => !this[value])) {
      return this.$router.replace('/')
    }
  },
  methods: {
    displayError (err) {
      console.error(err) // eslint-disable-line no-console
      const data = {
        'app.estimateID': this.estimateID,
        errorMessage: err
      }
      trackEvent('paymentsFrontendError', data)
      err = err.message || err
      this.error = err
      this.processing = false
    },

    async createPaymentMethod () {
      const { paymentMethod, error } = await instance.createPaymentMethod(
        'card', this.$refs['card-element'].$refs.element._element,
        { billing_details: { name: this.cardholderName, email: this.cardholderEmail } }
      )
      if (error) {
        throw error
      }
      return paymentMethod
    },

    // Use Stripe.js to handle required card action
    async handleCardAction (paymentIntentClientSecret) {
      const { paymentIntent, error } = await instance.handleCardAction(paymentIntentClientSecret)
      if (error) {
        throw error
      }
      return paymentIntent
    },

    fetchCheckout (paymentMethod) {
      return fetch(process.env.VUE_APP_CHECKOUT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: paymentMethod.id,
          amount: this.priceCents,
          currency: this.currency,
          saveCard: this.saveCard,
          estimateID: this.estimateID
        })
      })
    },

    fetchConfirm (paymentIntent) {
      return fetch(process.env.VUE_APP_CHECKOUT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntent: paymentIntent.id,
          saveCard: this.saveCard,
          estimateID: this.estimateID
        })
      })
    },

    async onCheckoutResponse (response) {
      const {
        success,
        customerID,
        error: err,
        requires_action: requiresAction,
        payment_intent_client_secret: paymentIntentClientSecret
      } = response
      if (err) {
        throw err
      }
      if (requiresAction) {
        const paymentIntent = await this.handleCardAction(paymentIntentClientSecret)
        const response = await this.fetchConfirm(paymentIntent)
        const confirm = await response.json()
        this.onCheckoutResponse(confirm)
      } else if (success) {
        trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
        if (customerID) {
          // TODO
          // this.$cookies.set('custID', customerID)
        }
        this.$router.push('/success')
      } else {
        throw new Error('undefined state in handling server response')
      }
    },

    // The Stripe handler methods below are modified from the docs:
    // https://stripe.com/docs/payments/payment-intents/quickstart#manual-confirmation-flow
    async pay () {
      trackEvent('paymentStarted', { 'app.estimateID': this.estimateID })
      // TODO: skip straight to this (ignore form) if user has a card saved already
      this.processing = true
      try {
        const paymentMethod = await this.createPaymentMethod()
        const response = await this.fetchCheckout(paymentMethod)
        const checkout = await response.json()
        this.onCheckoutResponse(checkout)
      } catch (err) {
        this.displayError(err)
      }
    }
  }
}
</script>

<style>
.checkout {
  text-align: center;
}
</style>
