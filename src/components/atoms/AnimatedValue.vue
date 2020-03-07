<template>
  <AnimatedNumber
    v-bind="$attrs"
    class="font-bold text-3xl md:text-4xl lg:text-5xl"
    :value="value"
    :duration="1500"
    :round="1"
    :format-value="formatter"
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
    value: {
      type: Number,
      required: true
    },
    formatter: {
      type: Function,
      required: true
    }
  }
}
</script>
