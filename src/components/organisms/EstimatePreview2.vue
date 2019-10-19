<template>
  <BField
    class="level is-mobile fields estimate-preview2"
    :class="{ 'is-loading': creating }"
  >
    <div class="level-item">
      <CarbonField :value="carbonData" />
    </div>
    <div class="level-item">
      <PriceField :value="price" />
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
  computed: {
    carbonData () {
      return { carbon: this.carbon, km: this.km }
    },
    ...mapState('estimate', ['creating', 'price', 'carbon', 'km'])
  }
}
</script>

<style lang="scss" scoped>
.estimate-preview2 {
  transition: opacity $speed-medium ease-in-out;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

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

<style lang="scss">
.estimate-preview2 {
  .label {
    @extend %sr-only;
  }
}
</style>
