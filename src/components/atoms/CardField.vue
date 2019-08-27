<template>
  <BField
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Card
      ref="card-element"
      class="card-element"
      :stripe="key"
      :options="options"
      @change="onChange"
    />
  </BField>
</template>

<script>
import { Card } from 'vue-stripe-elements-plus'

export default {
  components: {
    Card
  },
  computed: {
    key () {
      return process.env.VUE_APP_STRIPE_PUBLIC_KEY
    },
    options () {
      return {
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
  methods: {
    onChange (...args) {
      this.$emit('change', ...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-element {
  margin-top: $size-6;
  margin-bottom: $size-6;
}
</style>
