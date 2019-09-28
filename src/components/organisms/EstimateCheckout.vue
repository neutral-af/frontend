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
        <NameField
          :value="name"
          @update="setName"
        />
        <EmailField
          :value="email"
          @update="setEmail"
        />
      </BField>
      <CardField
        label="Card details"
        @mounted="onCardMounted"
      />
      <BField>
        <BCheckbox
          :value="saveCard"
          size="is-small"
          @input="setSaveCard"
        >
          Please save my card to skip this process in the future.
        </BCheckbox>
      </BField>
    </template>
    <BField>
      <BButton
        native-type="submit"
        type="is-primary"
        size="is-medium"
        :disabled="disabled"
        :class="{ 'is-loading': paying }"
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { trackEvent } from '@/honeycomb'
import CardField from '@/components/molecules/CardField'
import EmailField from '@/components/molecules/EmailField'
import NameField from '@/components/molecules/NameField'

export default {
  components: {
    CardField,
    EmailField,
    NameField
  },
  computed: {
    ...mapState('estimate', ['carbon', 'price']),
    ...mapState('checkoutForm', ['cardComplete', 'email', 'name', 'paying', 'saveCard']),
    hasPreviouslySaved () {
      return this.previouslySavedDetails.paymentMethod && this.previouslySavedDetails.customer
    },
    previouslySavedDetails () {
      return {
        paymentMethod: this.$cookies.get('pmID'),
        customer: this.$cookies.get('custID')
      }
    },
    disabled () {
      return !this.cardComplete || this.paying
    }
  },
  methods: {
    ...mapMutations('checkoutForm', [
      'setCardElement',
      'setName',
      'setEmail',
      'setSaveCard'
    ]),
    showError (message = '') {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom'
      })
    },
    onCardMounted (element) {
      console.log(element)
      this.setCardElement(element.$refs.element._element)
    },
    // async createPaymentMethod () {
    //   const { paymentMethod, error } = await instance.createPaymentMethod(
    //     'card',
    //     this.cardElement.$refs.element._element,
    //     { billing_details: { name: this.name, email: this.email } }
    //   )
    //   if (error) {
    //     throw error
    //   }

    //   if (this.saveCard) {
    //     this.$cookies.set('pmID', paymentMethod.id)
    //   }
    //   return paymentMethod
    // },

    validate () {
      return true
    },
    async onSubmit () {
      if (!this.validate()) {
        return
      }
      trackEvent('paymentStarted', { 'app.estimateID': this.estimateID })
      try {
        await this.$store.dispatch('checkoutForm/pay')
        trackEvent('paymentSuccessful', { 'app.estimateID': this.estimateID })
        this.$router.push('/success')
      } catch (err) {
        const message = err.message || err
        trackEvent('paymentsFrontendError', {
          'app.estimateID': this.estimateID,
          errorMessage: message
        })
        this.showError(message)
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>
