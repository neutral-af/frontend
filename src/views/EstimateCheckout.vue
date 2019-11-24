<template>
  <form
    novalidate
    autocomplete="off"
    class="checkout-form"
    @submit.prevent="onSubmit"
  >
    <template v-if="saved">
      Use previously saved card?
      <CardField
        hidden
        label="Card details"
        @mounted="onCardMounted"
      />
    </template>
    <template v-else>
      <Field
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
      </Field>
      <CardField
        label="Card details"
        @mounted="onCardMounted"
      />
      <Field invert>
        <BCheckbox
          :value="saveCard"
          @input="setSaveCard"
        >
          Please save my card to skip this process in the future.
        </BCheckbox>
      </Field>
      <BNotification
        v-if="envWarningShown"
        type="is-warning"
        :closable="false"
      >
        Environment is <strong>{{ env }}</strong>, do not use a real credit card number!
      </BNotification>
    </template>
    <div class="has-text-centered">
      <Field>
        <RoundedButton
          native-type="submit"
          type="is-primary"
          size="is-large"
          outlined
          inverted
          icon-left="check"
          :disabled="!payable"
          :class="{ 'is-loading': paying }"
        >
          Pay now
        </RoundedButton>
      </Field>
      <p class="field">
        <small>
          Payment will be processed securely by Stripe
        </small>
      </p>
      <Field class="checkout-form-back">
        <RoundedButton
          tag="router-link"
          :to="{ name: 'estimate-home', query: this.$route.query }"
          type="is-dark"
          outlined
          inverted
          icon-left="arrow-left"
        >
          Back to Flights
        </RoundedButton>
      </Field>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

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
    ...mapState('checkoutForm', [
      'cardComplete',
      'customerId',
      'email',
      'name',
      'paying',
      'paymentMethodId',
      'saveCard'
    ]),
    ...mapState('estimate', ['id', 'carbon', 'price', 'provider']),
    ...mapGetters('estimate', ['hasEstimate']),
    env () {
      return process.env.VUE_APP_ENV
    },
    envWarningShown () {
      return this.env !== 'prod'
    },
    saved () {
      return this.paymentMethodId && this.customerId
    },
    valid () {
      return this.email && this.name && this.cardComplete
    },
    payable () {
      return this.valid && !this.paying
    }
  },
  created () {
    if (!this.hasEstimate) {
      this.$router.replace({ name: 'estimate-home', query: this.$route.query })
    }
  },
  methods: {
    ...mapMutations('checkoutForm', [
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
      this.cardElement = element
    },

    async onSubmit () {
      if (!this.payable) {
        return
      }
      try {
        await this.$store.dispatch('checkoutForm/pay', this.cardElement.$refs.element._element)
        this.$router.push({ name: 'estimate-success' })
      } catch (err) {
        this.showError(err)
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-form {
  &-back {
    padding-top: $size-6;
  }
}
</style>
