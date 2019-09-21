<template>
  <BField label="Price">
    <p class="is-size-3">
      <Price
        :cents="cents"
        :currency="currency"
      />
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
      default: null
    }
  },
  computed: {
    cents () {
      return this.value ? this.value.cents : 0
    },
    currency () {
      return this.value ? this.value.currency : this.$store.state.userCurrency
    }
  }
}
</script>
