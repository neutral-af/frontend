<template>
  <main>
    <h1 class="title">
      Purchase your offsets
    </h1>

    <div class="box">
      <form @submit.prevent="onSubmit">
        <BField
          label="Cardholder Name"
          label-for="name"
          :type="submitted ? (nameValid ? 'is-success' : 'is-danger') : ''"
        >
          <BInput
            v-model.trim="name"
            name="name"
            size="is-medium"
            placeholder="Your Cardholder Name"
            @input="onInputChange"
          />
        </BField>

        <BField
          label="Email"
          label-for="email"
          :type="submitted ? (emailValid ? 'is-success' : 'is-danger') : ''"
        >
          <BInput
            v-model.trim="email"
            name="email"
            placeholder="Your Email Address"
            size="is-medium"
            type="email"
            @input="onInputChange"
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

        <CardField
          label="Card details"
          @change="onCardChange"
        />

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
            :class="{ 'is-loading': submitting }"
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
import { instance } from 'vue-stripe-elements-plus'

import { trackEvent } from '../honeycomb'
import { payments } from '../api'
import CardField from '@/components/atoms/CardField'

const stateKeys = ['carbon', 'price']

export default {
  name: 'Checkout',
  components: {
    CardField
  },
  data () {
    return {
      name: '',
      email: '',
      cardComplete: false,
      saveCard: false,
      submitting: false,
      submitted: false
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
      return this.cardComplete && this.nameValid && this.emailValid
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
        position: 'is-bottom'
      })
    },

    onInputChange () {
      this.submitted = false
    },

    onCardChange ({ complete }) {
      this.cardComplete = !!complete
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
    async onSubmit () {
      this.submitted = true
      if (!this.formValid) {
        return
      }
      this.submitting = true
      trackEvent('paymentStarted', { 'app.estimateID': this.estimateID })
      // TODO: skip straight to this (ignore form) if user has a card saved already
      try {
        const paymentMethod = await this.createPaymentMethod()
        const checkout = await this.fetchCheckout(paymentMethod)
        this.onCheckoutResponse(checkout)
        this.submitting = false
      } catch (err) {
        this.showError(err)
        this.submitting = false
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>
