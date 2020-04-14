<template>
  <form
    novalidate
    autocomplete="off"
    class="max-w-md"
    @submit.prevent="onSubmit"
  >
    <!-- <template v-if="saved">
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
    <div class="pt-6">
      <Button
        type="submit"
        size="lg"
        icon-left="check"
        :disabled="!payable"
        :loading="paying"
      >
        Pay now
      </Button>
      <p class="mt-4 text-sm md:text-base">
        Payment will be processed securely by Stripe
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

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
      cardElement: null
    }
  },
  computed: {
    ...mapState('checkout', ['cardComplete', 'customerId', 'email', 'name', 'paying', 'paymentMethodId', 'saveCard']),
    ...mapState('estimate', ['estimate']),
    env () {
      return process.env.VUE_APP_ENV
    },
    envWarningShown () {
      return this.env !== 'prod'
    },
    estimateForPayment () {
      return {
        id: this.estimate.id,
        carbon: this.estimate.carbon,
        options: {
          provider: this.estimate.provider
        }
      }
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
    if (!this.estimate) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
    }
  },
  methods: {
    ...mapMutations('checkout', [
      'setName',
      'setEmail',
      'setSaveCard'
    ]),
    ...mapMutations('estimate', ['resetFlights']),
    ...mapActions('checkout', ['pay']),
    onCardMounted (element) {
      this.cardElement = element
    },
    async onSubmit () {
      if (!this.payable) {
        return
      }
      await this.pay(this.cardElement.$refs.element._element)
      this.resetFlights()
      this.$router.push({ name: 'success' })
    }
  }
}
</script>
