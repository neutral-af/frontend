<template>
  <strong class="is-size-5 is-size-3-tablet is-size-2-desktop price">
    <AnimatedNumber
      :value="cents"
      :duration="1500"
      :round="1"
      :format-value="format"
      easing="easeInOutQuint"
    />
  </strong>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'

import { formatPrice } from '@/utils'

export default {
  components: {
    AnimatedNumber
  },
  props: {
    cents: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  methods: {
    format (value) {
      return formatPrice(value, this.currency)
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  color: inherit;
}
</style>
