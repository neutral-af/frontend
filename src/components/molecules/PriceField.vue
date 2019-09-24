<template>
  <BField
    label="Price"
    class="price-field"
  >
    <BField
      class="fields"
      position="is-centered"
      grouped
      group-multiline
    >
      <BField class="is-size-3">
        <Price
          :cents="cents"
          :currency="currency"
        />
      </BField>
      <CurrencyField />
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

<style lang="scss" scoped>
.fields {
  align-items: center;
}
</style>
