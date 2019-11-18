<template>
  <CustomField
    class="currency-field"
    title="Update currency"
    invert
  >
    <BSelect
      name="currency"
      placeholder="Select a currency"
      :value="currency"
      :loading="updating"
      :disabled="updating"
      size="is-small"
      @input="update"
    >
      <option
        v-for="currency in currencies"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </BSelect>
  </CustomField>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currencies: ['EUR', 'CAD', 'GBP', 'USD'],
      updating: false
    }
  },
  computed: mapState({
    currency: 'userCurrency'
  }),
  methods: {
    async update (value) {
      if (this.updating) {
        return
      }
      this.updating = true
      this.$store.commit('setUserCurrency', value)
      this.updating = false
    }
  }
}
</script>

<style lang="scss">
.currency-field {
  .select {
    select:not([multiple]) {
      padding-right: 1em;
    }

    &:not(.is-multiple):not(.is-loading)::after {
      right: .5em;
    }
  }
}
</style>
