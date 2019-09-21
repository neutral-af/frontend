<template>
  <BField class="level fields">
    <div class="level-item field">
      <CarbonField
        v-if="carbon"
        :value="carbon"
      />
      <p v-else>
        Carbon…
      </p>
    </div>
    <div class="level-item field">
      <div>
        <template v-if="price">
          <PriceField
            :value="price"
          />
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
        </template>
        <p v-else>
          Price…
        </p>
      </div>
    </div>
  </BField>
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
.fields,
.field {
  align-items: flex-start;
}
</style>
