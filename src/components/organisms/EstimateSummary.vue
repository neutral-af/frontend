<template>
  <div
    class="relative mb-4 transition-colors duration-300 inline-flex items-center justify-center"
    :class="{ 'text-gray-400 pointer-events-none': creating }"
  >
    <LoadingIcon
      v-if="creating"
      class="absolute text-gray-700 z-10 bg-white rounded-full p-4 box-content"
    />
    <div class="mr-4 md:mr-6 lg:mr-8 flex items-center justify-center">
      <div>
        <span class="sr-only">Carbon</span>
        <AnimatedCarbon :amount="carbon" />
        <span>
          CO<sub>2</sub>
        </span>
      </div>
      <div>
        <InfoButton
          v-if="carbon"
          as="RouterLink"
          class="ml-1"
          title="See Carbon Info"
          :to="{ name: 'carbon-info' }"
        />
      </div>
    </div>
    <div class="flex items-center justify-center relative">
      <div>
        <span class="sr-only">Price</span>
        <AnimatedPrice
          :cents="price ? price.cents : 0"
          :currency="currency"
        />
      </div>
      <div>
        <InfoButton
          v-if="price"
          as="RouterLink"
          class="ml-1"
          title="See Price Info"
          :to="{ name: 'price-info' }"
        />
      </div>
      <CurrencyField
        class="absolute right-0 pl-1"
        style="transform: translateX(100%)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AnimatedCarbon from '@/components/molecules/AnimatedCarbon'
import AnimatedPrice from '@/components/molecules/AnimatedPrice'
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

<style scoped>
.estimate-summary {
  &-currency {
    margin-left: .5rem;
  }
}
</style>
