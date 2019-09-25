<template>
  <BField
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Card
      ref="card"
      class="stripe-card input is-medium"
      :class="{ 'complete': complete }"
      :stripe="key"
      :options="options"
      @change="onChange"
    />
  </BField>
</template>

<script>
import { mapState } from 'vuex'

import { Card } from 'vue-stripe-elements-plus'

export default {
  components: {
    Card
  },
  computed: {
    ...mapState('checkoutForm', {
      complete: 'cardComplete'
    }),
    key () {
      return process.env.VUE_APP_STRIPE_PUBLIC_KEY
    },
    options () {
      return {
        hidePostalCode: true,
        style: {
          base: {
            color: '#4a4a4a',
            fontFamily: 'Hind, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '1.25rem',
            '::placeholder': {
              color: 'rgba(54,54,54,.3)'
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
  mounted () {
    this.$emit('mounted', this.$refs.card)
  },
  methods: {
    onChange ({ complete }) {
      this.$store.commit('checkoutForm/setCardComplete', complete)
    }
  }
}
</script>

<style lang="scss" scoped>
.stripe-card {
  margin-top: $size-6;
  margin-bottom: $size-6;
  padding-top: $size-7;

  &.input {
    display: block
  }
}
</style>
