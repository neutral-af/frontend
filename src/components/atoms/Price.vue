<template>
  <AnimatedNumber
    :value="cents"
    :duration="1500"
    :round="1"
    :format-value="format"
    easing="easeInOutQuint"
  />
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import { formatCurrencyCents } from '../../utils'

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
      return formatCurrencyCents(value, this.currency)
    }
  }
}
</script>
