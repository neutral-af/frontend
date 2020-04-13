<template>
  <form
    novalidate
    autocomplete="off"
    class="max-w-md"
    @submit.prevent="onSubmit"
  >
    <!-- <template v-if="hasPreviouslySaved">
      Use previously saved card?
      <CardField
        id="card"
        hidden
        @mounted="onCardMounted"
      />
    </template> -->
    <!-- <template v-else> -->
    <NameField
      :value="name"
      @update="setName"
    />
    <EmailField
      :value="email"
      @update="setEmail"
    />
    <CardField
      id="card"
      @mounted="onCardMounted"
    />
    <Message v-if="envWarningShown">
      Environment is <strong>{{ env }}</strong>, do not use a real credit card number!
    </Message>
    <!-- <Field id="save-card">
      <Checkbox
        id="save-card"
        size="sm"
        :checked="saveCard"
        @change="setSaveCard"
      >
        Save my card for future use
      </Checkbox>
    </Field> -->
    <!-- </template> -->
    <div class="py-6">
      <Button
        type="submit"
        size="lg"
        icon-left="check"
        :disabled="submitting"
        :loading="submitting"
      >
        Pay now
      </Button>
      <p class="mt-4 text-sm md:text-base">
        Payment will be processed securely by Stripe
      </p>
    </div>
    <Button
      as="RouterLink"
      :to="{ name: 'flights', query: this.$route.query }"
      icon-left="arrow-left"
      class="mt-6"
    >
      Back to Flights
    </Button>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { instance } from 'vue-stripe-elements-plus'

import { trackEvent } from '@/honeycomb'
import { payments } from '@/api'
import CardField from '@/components/molecules/CardField'
import EmailField from '@/components/molecules/EmailField'
import NameField from '@/components/molecules/NameField'

export default {
  components: {
    CardField,
    EmailField,
    NameField
  },
  data () {
    return {
      cardElement: null,
      submitting: false
    }
  },
  computed: {
    ...mapState('checkoutForm', ['cardComplete', 'email', 'name', 'paying', 'saveCard']),
    ...mapState('estimate', ['id', 'carbon', 'price', 'provider']),
    ...mapGetters('estimate', ['hasEstimate']),
    envWarningShown () {
      return this.env !== 'prod'
    },
    env () {
      return process.env.VUE_APP_ENV
    },
    estimateForPayment () {
      return {
        id: this.id,
        carbon: this.carbon,
        options: {
          provider: this.provider
        }
      }
    },
    // hasPreviouslySaved () {
    //   return this.previouslySavedDetails.paymentMethod && this.previouslySavedDetails.customer
    // },
    previouslySavedDetails () {
      return {
        paymentMethod: this.$cookies.get('pmID'),
        customer: this.$cookies.get('custID')
      }
    }
  },
  created () {
    if (!this.hasEstimate) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
    }
  },
  methods: {
    ...mapMutations('checkoutForm', [
      'setName',
      'setEmail',
      'setSaveCard'
    ]),

    showError (message = '') {
      this.$toasted.show({
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
        estimate: this.estimateForPayment,
        paymentMethod: paymentMethod.id,
        currency: this.price.currency,
        options: {
          saveCard: this.saveCard,
          ...customerID && { customerID }
        }
      })
    },

    fetchConfirm (paymentIntent) {
      return payments.confirm({
        estimate: this.estimateForPayment,
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
        this.onSuccess({ customerID })
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
        // let checkout
        // if (this.hasPreviouslySaved) {
        //   checkout = await this.fetchCheckout({
        //     paymentMethod: { id: this.previouslySavedDetails.paymentMethod },
        //     customerID: this.previouslySavedDetails.customer
        //   })
        // } else {
        const paymentMethod = await this.createPaymentMethod()
        const checkout = await this.fetchCheckout({ paymentMethod })
        // }
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
    },

    onSuccess (data) {
      trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
      if (data.customerID) {
        this.$cookies.set('custID', data.customerID)
      }
      this.$store.commit('estimateForm/reset')
      this.$router.push({ name: 'success' })
    }
  }
}
</script>
