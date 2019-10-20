<template>
  <BField
    v-bind="$attrs"
    class="field-invert"
    v-on="$listeners"
  >
    <div class="input is-medium card-wrapper">
      <Card
        ref="card"
        class="card-element"
        :class="{ 'complete': complete }"
        :stripe="key"
        :options="options"
        @change="onChange"
      />
    </div>
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
            color: '#d9d9d9',
            fontFamily: 'Hind, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '22px',
            '::placeholder': {
              color: '#7a7a7a'
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
.card-wrapper {
  display: block;
  padding-top: 0;
  padding-bottom: 0;
}

.card-element {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
