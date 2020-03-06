<template>
  <Field
    id="currency"
    label="Update currency"
    label-class="sr-only"
  >
    <Select
      id="currency"
      name="currency"
      placeholder="Select a currency"
      size="sm"
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
    </Select>
  </Field>
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
