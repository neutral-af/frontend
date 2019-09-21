<template>
  <BField label="Price">
    <BField grouped>
      <BField class="is-size-3">
        <Price
          :cents="cents"
          :currency="currency"
        />
      </BField>
      <CurrencyField v-if="value" />
    </BField>
  </BField>
</template>

<script>
import CurrencyField from '@/components/molecules/CurrencyField'
import Price from '@/components/atoms/Price'

export default {
  components: {
    CurrencyField,
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
