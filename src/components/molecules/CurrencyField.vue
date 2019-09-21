<template>
  <BSelect
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
      await this.$store.dispatch('estimate/create')
      this.updating = false
    }
  }
}
</script>
