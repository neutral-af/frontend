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
      return (value / 100).toLocaleString(window.navigator.language, {
        style: 'currency',
        currency: this.currency,
        currencyDisplay: 'symbol'
      })
    }
  }
}
</script>
