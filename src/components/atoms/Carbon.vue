<template>
  <span>
    <AnimatedNumber
      :value="amount"
      :duration="1500"
      :round="1"
      easing="easeInOutQuint"
    />
    kg CO<sub>2</sub>
  </span>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'

export default {
  components: {
    AnimatedNumber
  },
  props: {
    amount: {
      type: Number,
      required: true
    }
  }
}
</script>
