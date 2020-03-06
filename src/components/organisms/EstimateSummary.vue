<template>
  <div
    class="absolute py-3 transition sm:mr-16 sm:left-auto sm:translate-x-0 md:mt-2 flex items-center justify-center"
    :class="{ 'opacity-50 pointer-events-none': creating }"
    style="left: 50%; transform: translateX(-50%)"
  >
    <div class="sm:mr-4">
      <span class="sr-only">Carbon</span>
      <Icon
        icon="cloud"
        size="sm"
        class="hidden mr-2 sm:inline"
      />
      <AnimatedCarbon :amount="carbon" />
      <InfoButton
        v-if="carbon"
        as="RouterLink"
        class="ml-2"
        title="See Carbon Info"
        :to="{ name: 'carbon-info' }"
      />
    </div>
    <div class="flex items-center justify-center">
      <div>
        <span class="sr-only">Price</span>
        <AnimatedPrice
          :cents="price ? price.cents : 0"
          :currency="currency"
        />
        <InfoButton
          v-if="price"
          as="RouterLink"
          class="ml-2"
          title="See Price Info"
          :to="{ name: 'price-info' }"
        />
      </div>
      <div>
        <CurrencyField
          class="ml-2"
          style="padding: 0 !important;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AnimatedCarbon from '@/components/atoms/AnimatedCarbon'
import AnimatedPrice from '@/components/atoms/AnimatedPrice'
import InfoButton from '@/components/molecules/InfoButton'
import CurrencyField from '@/components/molecules/CurrencyField'

export default {
  components: {
    AnimatedCarbon,
    AnimatedPrice,
    InfoButton,
    CurrencyField
  },
  computed: {
    ...mapState('estimate', ['carbon', 'creating', 'price']),
    currency () {
      return this.price ? this.price.currency : this.$store.state.userCurrency
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-summary {
  &-currency {
    margin-left: .5rem;
  }
}
</style>
