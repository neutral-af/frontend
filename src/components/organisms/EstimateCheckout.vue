<template>
  <form
    novalidate
    autocomplete="off"
    class="checkout-form"
    @submit.prevent="onSubmit"
  >
    <template v-if="hasPreviouslySaved">
      Use previously saved card?
      <CardField
        hidden
        label="Card details"
        @mounted="onCardMounted"
      />
    </template>
    <template v-else>
      <BField
        grouped
        group-multiline
        position="is-centered"
      >
        <BField
          label="Cardholder Name"
          label-for="name"
          class="field-invert"
        >
          <BInput
            v-model.trim="name"
            name="name"
            size="is-medium"
            placeholder="Your Cardholder Name"
            required
          />
        </BField>
        <BField
          label="Email"
          label-for="email"
          class="field-invert"
        >
          <BInput
            v-model.trim="email"
            name="email"
            placeholder="Your Email Address"
            size="is-medium"
            type="email"
            required
          />
        </BField>
      </BField>
      <CardField
        label="Card details"
        @mounted="onCardMounted"
      />
      <BField class="field-invert">
        <BCheckbox
          v-model="saveCard"
        >
          Please save my card to skip this process in the future.
        </BCheckbox>
      </BField>
      <BNotification
        v-if="envWarningShown"
        type="is-warning"
        :closable="false"
      >
        Environment is <strong>{{ env }}</strong>, do not use a real credit card number!
      </BNotification>
    </template>
    <div class="has-text-centered">
      <BField>
        <RoundedButton
          native-type="submit"
          type="is-primary"
          size="is-large"
          outlined
          inverted
          icon-left="check"
          :disabled="submitting"
          :class="{ 'is-loading': submitting }"
        >
          Pay now
        </RoundedButton>
      </BField>
      <p>
        Payment will be processed securely by Stripe
      </p>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { instance } from 'vue-stripe-elements-plus'

import { trackEvent } from '@/honeycomb'
import { payments } from '@/api'
import CardField from '@/components/atoms/CardField'

export default {
  components: {
    CardField
  },
  data () {
    return {
      name: '',
      email: '',
      cardElement: null,
      saveCard: false,
      submitting: false
    }
  },
  computed: {
    ...mapState('estimate', ['carbon', 'price']),
    envWarningShown () {
      return this.env !== 'prod'
    },
    env () {
      return process.env.VUE_APP_ENV
    },
    hasPreviouslySaved () {
      return this.previouslySavedDetails.paymentMethod && this.previouslySavedDetails.customer
    },
    previouslySavedDetails () {
      return {
        paymentMethod: this.$cookies.get('pmID'),
        customer: this.$cookies.get('custID')
      }
    }
  },
  methods: {
    showError (message = '') {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom'
      })
    },

    onCardMounted (element) {
      this.cardElement = element
    },

    async createPaymentMethod () {
      const { paymentMethod, error } = await instance.createPaymentMethod(
        'card',
        this.cardElement.$refs.element._element,
        { billing_details: { name: this.name, email: this.email } }
      )
      if (error) {
        throw error
      }

      if (this.saveCard) {
        this.$cookies.set('pmID', paymentMethod.id)
      }
      return paymentMethod
    },

    // Use Stripe.js to handle required card action
    async handleCardAction (paymentIntentClientSecret) {
      const { paymentIntent, error } = await instance.handleCardAction(
        paymentIntentClientSecret
      )
      if (error) {
        throw error
      }
      return paymentIntent
    },

    fetchCheckout ({ paymentMethod, customerID }) {
      return payments.checkout({
        paymentMethod: paymentMethod.id,
        amount: this.price.cents,
        currency: this.price.currency,
        options: {
          saveCard: this.saveCard,
          ...customerID && { customerID }
        }
      })
    },

    fetchConfirm (paymentIntent) {
      return payments.confirm({
        paymentIntent: paymentIntent.id,
        saveCard: this.saveCard
      })
    },

    async onCheckoutResponse ({
      success,
      requiresAction,
      paymentIntentClientSecret,
      customerID
    }) {
      if (requiresAction) {
        const paymentIntent = await this.handleCardAction(
          paymentIntentClientSecret
        )
        const confirm = await this.fetchConfirm(paymentIntent)
        this.onCheckoutResponse(confirm)
      } else if (success) {
        trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
        if (customerID) {
          this.$cookies.set('custID', customerID)
        }
        this.$router.push('/success')
      } else {
        throw new Error('undefined state in handling server response')
      }
    },

    async validate () {
      // const result = await this.$refs.observer.validate()
      // if (!result) {
      // this.$toast.open({
      //   message: 'Form is not valid! Please check the fields.',
      //   type: 'is-danger',
      //   position: 'is-bottom'
      // })
      // return false
      // }
      return true
    },

    // The Stripe handler methods below are modified from the docs:
    // https://stripe.com/docs/payments/payment-intents/quickstart#manual-confirmation-flow
    async onSubmit () {
      if (this.submitting) {
        return
      }
      const valid = await this.validate()
      if (!valid) {
        return
      }
      this.submitting = true
      trackEvent('paymentStarted', { 'app.estimateID': this.estimateID })

      try {
        let checkout
        if (this.hasPreviouslySaved) {
          checkout = await this.fetchCheckout({
            paymentMethod: { id: this.previouslySavedDetails.paymentMethod },
            customerID: this.previouslySavedDetails.customer
          })
        } else {
          const paymentMethod = await this.createPaymentMethod()
          checkout = await this.fetchCheckout({ paymentMethod })
        }
        this.onCheckoutResponse(checkout)
        this.submitting = false
      } catch (err) {
        const message = err.message || err
        trackEvent('paymentsFrontendError', {
          'app.estimateID': this.estimateID,
          errorMessage: message
        })
        this.showError(message)
        this.submitting = false
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>
