<template>
  <div
    class="level is-mobile estimate-preview"
    :class="{ 'is-loading': creating }"
  >
    <div class="level-item estimate-preview-carbon">
      <span class="estimate-preview-label">Carbon</span>
      <Carbon :amount="carbon" />
      &nbsp;
      <Info
        v-if="carbon"
        @click="openCarbonBreakdown"
      />
    </div>
    <div class="level-item">
      <span class="estimate-preview-label">Price</span>
      <Price
        :cents="price ? price.cents : 0"
        :currency="price ? price.currency : $store.state.userCurrency"
      />
      <!-- <CurrencyField /> -->
      &nbsp;
      <Info
        v-if="price"
        @click="openPriceBreakdown"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Info from '@/components/atoms/Info'
import Carbon from '@/components/atoms/Carbon'
import CarbonBreakdownModal from '@/components/molecules/CarbonBreakdownModal'
import Price from '@/components/atoms/Price'
import PriceBreakdownModal from '@/components/molecules/PriceBreakdownModal'
// import CurrencyField from '@/components/molecules/CurrencyField'

export default {
  components: {
    Carbon,
    Price,
    Info
    // CurrencyField
  },
  computed: {
    ...mapState('estimate', ['creating', 'price', 'carbon', 'km'])
  },
  methods: {
    openCarbonBreakdown () {
      this.$buefy.modal.open({
        parent: this,
        component: CarbonBreakdownModal,
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
        component: PriceBreakdownModal,
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
.estimate-preview {
  position: absolute;
  top: 0;
  left: 50%;
  height: 3.25rem;
  transform: translateX(-50%);
  z-index: 31;
  transition: opacity $speed-medium ease-in-out;

  @include mobile {
    right: 3.25rem + .5rem;
    left: auto;
    transform: none;
  }

  @include desktop {
    height: 4rem;
  }

  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &-carbon {
    @include tablet {
      margin-right: 2rem !important;
    }
  }

  &-label {
    @extend %sr-only;
  }
}
</style>
