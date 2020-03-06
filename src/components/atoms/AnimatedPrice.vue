<template>
  <strong class="text-xl md:text-2xl lg:text-3xl">
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
