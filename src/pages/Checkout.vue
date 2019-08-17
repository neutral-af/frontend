<template>
  <main>
    <h1 class="title">
      Purchase your offsets
    </h1>

    <div class="box">
      <form @submit.prevent="pay">
      <BField
        label="Cardholder Name"
        label-for="name"
        :type="nameValid ? 'is-success' : 'is-danger'"
      >
        <BInput
          v-model.trim="name"
          name="name"
          size="is-medium"
          placeholder="Your Cardholder Name"
        />
      </BField>

      <BField
        label="Email"
        label-for="email"
        :type="emailValid ? 'is-success' : 'is-danger'"
      >
        <BInput
          v-model.trim="email"
          name="email"
          placeholder="Your Email Address"
          size="is-medium"
          type="email"
        />
      </BField>

      <BField grouped>
        <BField
          label="Carbon amount"
          name="carbon"
          label-for="email"
        >
          <BInput
            :value="`${carbon} kg`"
            readonly
            disabled
            size="is-medium"
            class="input is-static"
          />
        </BField>

        <BField
          label="Price"
          name="price"
          label-for="price"
        >
          <BInput
            :value="priceLocal"
            readonly
            disabled
            size="is-medium"
            class="input is-static"
          />
        </BField>
      </BField>

      <BField label="Card details">
        <Card
          ref="card-element"
          :stripe="stripeKey"
          :class="{ complete }"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />
      </BField>

      <BField>
        <BCheckbox
          v-model="saveCard"
          size="is-small"
          disabled
        >
          Please save my card to skip this process in the future.
        </BCheckbox>
      </BField>

      <BField>
        <BButton
          native-type="submit"
          type="is-primary"
          size="is-medium"
          :class="{ 'is-loading': processing }"
          :disabled="!formValid"
        >
          Pay now
        </BButton>
      </BField>

      <BField>
        <p class="content is-small">
          Payment will be processed securely by Stripe
        </p>
      </BField>
      </form>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { Card, instance } from 'vue-stripe-elements-plus'

import { trackEvent } from '../honeycomb'
import { payments } from '../api'

const stateKeys = ['carbon', 'price']

export default {
  name: 'Checkout',
  components: { Card },
  data () {
    return {
      name: '',
      email: '',
      saveCard: false,
      error: '',
      complete: false, // form is completely filled out
      processing: false,
      stripeKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
      stripeOptions: {
        hidePostalCode: true,
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
      return (this.price.cents / 100).toLocaleString(navigator.languages[0], {
        style: 'currency',
        currency: this.price.currency,
        currencyDisplay: 'symbol'
      })
    },
    nameValid () {
      return !!this.name
    },
    emailValid () {
      return !!this.email
    },
    formValid () {
      return this.complete && this.nameValid && this.emailValid
    }
  },
  created () {
    if (stateKeys.some(value => !this[value])) {
      return this.$router.replace('/')
    }
  },
  methods: {
    showError (err) {
      const message = err.message || err
      trackEvent('paymentsFrontendError', {
        'app.estimateID': this.estimateID,
        errorMessage: message
      })
      this.$snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        indefinite: true
      })
    },

    async createPaymentMethod () {
      const { paymentMethod, error } = await instance.createPaymentMethod(
        'card', this.$refs['card-element'].$refs.element._element,
        { billing_details: { name: this.name, email: this.email } }
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
      return payments.checkout({
        paymentMethod: paymentMethod.id,
        amount: this.price.cents,
        currency: this.price.currency
      })
    },

    fetchConfirm (paymentIntent) {
      return payments.confirm({ paymentIntent: paymentIntent.id })
    },

    async onCheckoutResponse ({ success, requiresAction, paymentIntentClientSecret }) {
      if (requiresAction) {
        const paymentIntent = await this.handleCardAction(paymentIntentClientSecret)
        const confirm = await this.fetchConfirm(paymentIntent)
        this.onCheckoutResponse(confirm)
      } else if (success) {
        trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
        // if (customerID) {
        //   // TODO
        //   // this.$cookies.set('custID', customerID)
        // }
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
        const checkout = await this.fetchCheckout(paymentMethod)
        this.onCheckoutResponse(checkout)
        this.processing = false
      } catch (err) {
        this.showError(err)
        this.processing = false
      }
    }
  }
}
</script>
