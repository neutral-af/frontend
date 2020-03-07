<template>
  <Field
    v-bind="$attrs"
    label="Card details"
    label-icon-left="credit-card"
    v-on="$listeners"
  >
    <Card
      ref="card"
      class="border-b py-2"
      :class="{ 'complete': complete }"
      :stripe="key"
      :options="options"
      @change="onChange"
    />
  </Field>
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
      // TODO: use tailwind JS theme options instead
      return {
        hidePostalCode: true,
        elements: {
          fonts: [{
            family: 'Hind',
            src: `url('${process.env.BASE_URL}fonts/hind-regular.woff') format('woff')`,
            weight: '400',
            style: 'normal',
            display: 'fallback'
          }, {
            family: 'Hind',
            src: `url('${process.env.BASE_URL}fonts/hind-bold.woff') format('woff')`,
            weight: '700',
            style: 'normal',
            display: 'fallback'
          }]
        },
        style: {
          base: {
            color: '#4a5568',
            fontFamily: 'Hind, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '20px',
            icon_color: 'white',
            '::placeholder': {
              color: '#a0aec0'
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
