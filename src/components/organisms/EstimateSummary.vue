<template>
  <div
    class="level is-mobile estimate-summary sm:mr-16 sm:left-auto sm:translate-x-0 md:mt-2"
    :class="{ 'is-loading': creating }"
  >
    <div class="level-item estimate-summary-carbon sm:mr-4">
      <span class="estimate-summary-label sr-only">Carbon</span>
      <BIcon
        icon="cloud"
        size="is-small"
        class="is-hidden-mobile estimate-summary-carbon-icon mr-2"
      />
      &nbsp;
      <AnimatedCarbon :amount="carbon" />
      <InfoButton
        v-if="carbon"
        class="estimate-summary-info"
        title="Open carbon breakdown"
        @click="openCarbonBreakdown"
      />
    </div>
    <div class="level-item">
      <span class="estimate-summary-label">Price</span>
      <AnimatedPrice
        :cents="price ? price.cents : 0"
        :currency="price ? price.currency : $store.state.userCurrency"
      />
      <InfoButton
        v-if="price"
        class="estimate-summary-info"
        title="Open price breakdown"
        @click="openPriceBreakdown"
      />
      <CurrencyField class="estimate-summary-currency" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AnimatedCarbon from '@/components/atoms/AnimatedCarbon'
import AnimatedPrice from '@/components/atoms/AnimatedPrice'
import InfoButton from '@/components/molecules/InfoButton'
import CarbonBreakdown from '@/components/molecules/CarbonBreakdown'
import PriceBreakdown from '@/components/molecules/PriceBreakdown'
import CurrencyField from '@/components/molecules/CurrencyField'

export default {
  components: {
    AnimatedCarbon,
    AnimatedPrice,
    InfoButton,
    CurrencyField
  },
  computed: {
    ...mapState('estimate', ['creating', 'price', 'carbon', 'km'])
  },
  methods: {
    openCarbonBreakdown () {
      // this.$buefy.modal.open({
      //   parent: this,
      //   component: CarbonBreakdown,
      //   hasModalCard: true,
      //   props: {
      //     carbon: this.carbon,
      //     km: this.km
      //   }
      // })
    },
    openPriceBreakdown () {
      // this.$buefy.modal.open({
      //   parent: this,
      //   component: PriceBreakdown,
      //   hasModalCard: true,
      //   props: {
      //     value: this.price.breakdown
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-summary {
  position: absolute;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 31;
  transition: opacity 100 ease-in-out;

  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &-info {
    margin-left: .5rem;
  }

  &-currency {
    margin-left: .5rem;
  }
}
</style>
