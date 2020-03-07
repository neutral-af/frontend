<template>
  <span>
    <strong class="text-xl md:text-2xl lg:text-3xl">
      <AnimatedNumber
        :value="amount"
        :duration="1500"
        :round="1"
        :format-value="format"
        easing="easeInOutQuint"
      />
    </strong>
    <span class="text-sm sm:text-base">
      CO<sub>2</sub>
    </span>
  </span>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'

import { weight as format } from '@/utils/formatters'

export default {
  components: {
    AnimatedNumber
  },
  props: {
    amount: {
      type: Number,
      required: true
    }
  },
  methods: {
    format
  }
}
</script>
