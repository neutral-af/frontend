<template>
  <strong class="is-size-5 is-size-4-tablet is-size-3-desktop price">
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

import { price as format } from '@/utils/formatters'

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
      return format(value, this.currency)
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  color: inherit;
}
</style>
