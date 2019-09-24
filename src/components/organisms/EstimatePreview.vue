<template>
  <BField
    class="level is-mobile fields"
    :class="{ 'is-loading': creating }"
  >
    <div class="level-item">
      <CarbonField :value="carbon" />
    </div>
    <div class="level-item">
      <PriceField :value="price" />
    </div>
    <div class=" field">
      <PriceBreakdown :value="price" />
    </div>
  </BField>
</template>

<script>
import { mapState } from 'vuex'

import CarbonField from '@/components/molecules/CarbonField'
import PriceBreakdown from '@/components/molecules/PriceBreakdown'
import PriceField from '@/components/molecules/PriceField'

export default {
  components: {
    CarbonField,
    PriceBreakdown,
    PriceField
  },
  computed: mapState('estimate', ['creating', 'price', 'carbon'])
}
</script>

<style lang="scss" scoped>
.fields {
  transition: opacity $speed-medium ease-in-out;

  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }
}

.fields,
.field {
  align-items: flex-start;
}
</style>
