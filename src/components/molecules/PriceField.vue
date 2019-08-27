<template>
  <BField label="Price">
    <p class="is-size-3">
      <Price v-bind="value" />
    </p>
  </BField>
</template>

<script>
import Price from '@/components/atoms/Price'

export default {
  components: {
    Price
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
