<template>
  <BField class="currency-field">
    <BSelect
      name="currency"
      placeholder="Select a currency"
      :value="currency"
      :loading="updating"
      :disabled="updating"
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
  </BField>
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
.currency-field .select {
  select:not([multiple]) {
    padding-right: 1.5em;
  }

  &:not(.is-multiple):not(.is-loading)::after {
    right: 1em;
  }
}
</style>
