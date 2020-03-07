<template>
  <AnimatedValue
    :value="cents"
    :formatter="format"
  />
</template>

<script>
import { price as format } from '@/utils/formatters'

export default {
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

<style scoped>
.price {
  color: inherit;
}
</style>
