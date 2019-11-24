<template>
  <div
    class="level is-mobile estimate-summary"
    :class="{ 'is-loading': creating }"
  >
    <div class="level-item estimate-summary-carbon">
      <span class="estimate-summary-label">Carbon</span>
      <BIcon
        icon="cloud"
        size="is-small"
        class="is-hidden-mobile estimate-summary-carbon-icon"
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
      this.$buefy.modal.open({
        parent: this,
        component: CarbonBreakdown,
        hasModalCard: true,
        props: {
          carbon: this.carbon,
          km: this.km
        }
      })
    },
    openPriceBreakdown () {
      this.$buefy.modal.open({
        parent: this,
        component: PriceBreakdown,
        hasModalCard: true,
        props: {
          value: this.price.breakdown
        }
      })
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
  transition: opacity $speed-medium ease-in-out;

  @include mobile {
    right: 3.25rem + .5rem;
    left: auto;
    transform: none;
  }

  @include desktop {
    // height: 4rem;
    top: .5rem;
  }

  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &-carbon {
    &-icon {
      margin-right: .5em;
    }

    @include tablet {
      margin-right: 2em !important;
    }
  }

  &-label {
    @extend %sr-only;
  }

  &-info {
    margin-left: .5rem;
  }

  &-currency {
    margin-left: .5rem;
  }
}
</style>
