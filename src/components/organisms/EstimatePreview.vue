<template>
  <div class="estimate-preview">
    <BField class="level fields">
      <div class="level-item field">
        <CarbonField :value="carbon" />
      </div>
      <div class="level-item field">
        <div>
          <PriceField :value="price" />
          <BField>
            <BSelect
              placeholder="Select a currency"
              :value="price.currency"
              :loading="updatingCurrency"
              :disabled="updatingCurrency"
              @input="updateCurrency"
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
        </div>
      </div>
    </BField>
    <BField>
      <BButton
        tag="router-link"
        type="is-primary"
        size="is-medium"
        :to="{ name: 'checkout' }"
      >
        Checkout
      </BButton>
    </BField>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CarbonField from '@/components/molecules/CarbonField'
import PriceField from '@/components/molecules/PriceField'

export default {
  components: {
    CarbonField,
    PriceField
  },
  data () {
    return {
      currencies: ['EUR', 'CAD', 'GBP', 'USD'],
      updatingCurrency: false
    }
  },
  computed: {
    ...mapState('estimate', ['price', 'carbon', 'fetching'])
  },
  methods: {
    async updateCurrency (value) {
      if (this.updatingCurrency) {
        return
      }
      this.updatingCurrency = true
      this.$store.commit('setUserCurrency', value)
      await this.$store.dispatch('estimate/update')
      this.updatingCurrency = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title,
.subtitle {
  color: inherit;
}

.fields,
.field {
  align-items: flex-start;
}
</style>
