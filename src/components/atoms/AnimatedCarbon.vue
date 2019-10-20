<template>
  <span class="animated-carbon">
    <strong class="is-size-5 is-size-4-tablet is-size-3-desktop animated-carbon-value">
      <AnimatedNumber
        :value="amount"
        :duration="1500"
        :round="1"
        :format-value="format"
        easing="easeInOutQuint"
      />
    </strong>
    <span class="is-size-4-desktop">
      CO<sub>2</sub>
    </span>
  </span>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'

import { formatWeight } from '@/utils'

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
    format (value) {
      return formatWeight(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.animated-carbon {
  &-value {
    color: inherit;
  }
}
</style>
