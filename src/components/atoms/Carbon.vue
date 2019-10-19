<template>
  <span class="carbon">
    <BIcon
      icon="cloud"
      size="is-small"
      class="carbon-icon"
    />
    &nbsp;
    <strong class="is-size-5 is-size-3-tablet is-size-2-desktop carbon-value">
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
.carbon {
  &-icon {
    vertical-align: -0.25rem;
  }

  &-value {
    color: inherit;
  }
}
</style>
