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
      @change="onChange"
    >
      <option
        v-for="currency in CURRENCIES"
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

import { mapConstants } from '@/utils'

export default {
  data () {
    return {
      updating: false
    }
  },
  computed: {
    ...mapState({ currency: 'userCurrency' }),
    ...mapConstants(['CURRENCIES'])
  },
  methods: {
    async onChange (value) {
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
