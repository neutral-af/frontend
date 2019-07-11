<template>
  <section class="hero is-primary is-bold is-fullheight checkout">
    <div class="hero-body columns is-centered is-vcentered">
      <div
        v-if="!succeeded"
        class="column is-two-thirds-tablet is-half-desktop is-one-third-fullhd"
      >
        <h1 class="title">
          Purchase your offsets
        </h1>
        <div class="box">
          <h2
            v-if="errorText"
            class="subtitle has-text-danger"
          >
            {{ errorText }}
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

      <div v-else>
        <h1 class="title">
          Thank you!
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import { Card, instance } from 'vue-stripe-elements-plus'
import { trackEvent } from '../honeycomb'

export default {
  name: 'Checkout',
  components: { Card },
  props: {
    priceCents: {
      required: true,
      validator: (value) => value > 0
    },
    carbon: {
      required: true,
      type: Number
    },
    currency: {
      required: true,
      type: String
    },
    estimateID: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      cardholderName: '',
      cardholderEmail: '',
      saveCard: false,
      errorText: '',
      complete: false, // form is completely filled out
      processing: false,
      succeeded: false,
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
  methods: {
    displayError (err) {
      /* eslint-disable-next-line no-console */
      console.error(err)
      trackEvent('paymentsFrontendError', {
        'app.estimateID': this.estimateID,
        errorMessage: err
      })
      err = err.message || err
      this.errorText = err
      this.processing = false
    },

    // The Stripe handler methods below are modified from the docs:
    // https://stripe.com/docs/payments/payment-intents/quickstart#manual-confirmation-flow
    async pay () {
      trackEvent('paymentStarted', { 'app.estimateID': this.estimateID })
      // TODO: skip straight to this (ignore form) if user has a card saved already
      try {
        this.processing = true
        const { paymentMethod, error: err } = await instance.createPaymentMethod(
          'card', this.$refs['card-element'].$refs.element._element,
          { billing_details: { name: this.cardholderName, email: this.cardholderEmail } }
        )
        if (err) throw err

        const checkout = await fetch(`${process.env.VUE_APP_CHECKOUT_API_URL}/api/checkout`, {
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

        this.handleServerResponse(await checkout.json())
      } catch (e) {
        this.displayError(e)
      }
    },
    async handleServerResponse (response) {
      try {
        const {
          success,
          customerID,
          error: err,
          requires_action: requiresAction,
          payment_intent_client_secret: paymentIntentClientSecret
        } = response

        if (err) throw err

        if (requiresAction) {
        // Use Stripe.js to handle required card action
          const { error: err, paymentIntent } = await instance.handleCardAction(paymentIntentClientSecret)

          if (err) throw err

          const confirm = await fetch(`${process.env.VUE_APP_CHECKOUT_API_URL}/api/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentIntent: paymentIntent.id,
              saveCard: this.saveCard,
              estimateID: this.estimateID
            })
          })
          this.handleServerResponse(await confirm.json())
        } else if (success) {
          trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
          this.succeeded = true
          if (customerID) {
            // TODO
            // this.$cookies.set('custID', customerID)
          }
        } else {
          throw new Error('undefined state in handling server response')
        }
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
