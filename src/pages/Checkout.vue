<template>
  <main>
    <h1 class="title">
      Purchase your offsets
    </h1>
    <div class="box">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        slim
      >
        <form
          novalidate
          @submit.prevent="onSubmit"
        >
          <BField class="level">
            <div class="level-item">
              <CarbonField :value="carbon" />
            </div>
            <div class="level-item">
              <PriceField :value="price" />
            </div>
          </BField>

          <ValidationProvider
            v-slot="{ errors, invalid }"
            slim
          >
            <BField
              label="Email"
              label-for="email"
              :type="{ 'is-danger': invalid }"
              :message="errors[0]"
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
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, invalid }"
            slim
          >
            <BField
              label="Cardholder Name"
              label-for="name"
              :type="{ 'is-danger': invalid }"
              :message="errors[0]"
            >
              <BInput
                v-model.trim="name"
                name="name"
                size="is-medium"
                placeholder="Your Cardholder Name"
                required
              />
            </BField>
          </ValidationProvider>

          <CardField
            label="Card details"
            @mounted="onCardMounted"
            @change="onCardChange"
          />
          <!-- <BField>
            <BCheckbox
              v-model="saveCard"
              size="is-small"
              disabled
            >
              Please save my card to skip this process in the future.
            </BCheckbox>
          </BField> -->

          <BField>
            <BButton
              native-type="submit"
              type="is-primary"
              size="is-medium"
              :disabled="invalid || submitting"
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
      </ValidationObserver>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { instance } from 'vue-stripe-elements-plus'

import { trackEvent } from '../honeycomb'
import { payments } from '../api'
import CardField from '@/components/atoms/CardField'
import CarbonField from '@/components/molecules/CarbonField'
import PriceField from '@/components/molecules/PriceField'

const stateKeys = ['carbon', 'price']

export default {
  name: 'Checkout',
  components: {
    CardField,
    CarbonField,
    PriceField
  },
  data () {
    return {
      name: '',
      email: '',
      cardElement: null,
      cardComplete: false,
      saveCard: false,
      submitting: false
    }
  },
  computed: {
    ...mapState('estimate', stateKeys)
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

    onCardMounted (element) {
      this.cardElement = element
    },

    onCardChange ({ complete }) {
      this.cardComplete = !!complete
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
        currency: this.price.currency,
        saveCard: this.saveCard
      })
    },

    fetchConfirm (paymentIntent) {
      return payments.confirm({
        paymentIntent: paymentIntent.id,
        saveCard: this.saveCard
      })
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

    async validate () {
      const result = await this.$refs.observer.validate()
      if (!result) {
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-bottom'
        })
        return false
      }
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
