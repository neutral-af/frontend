<template>
  <AnimatedValue
    :value="amount"
    :formatter="format"
    easing="easeInOutQuint"
  />
</template>

<script>
import { weight as format } from '@/utils/formatters'

export default {
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
