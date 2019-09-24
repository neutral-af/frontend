<template>
  <div>
    <BField class="level fields">
      <div class="level-item field">
        <CarbonField :value="carbon" />
      </div>
      <div class="level-item field">
        <PriceField :value="price" />
      </div>
    </BField>
    <div class=" field">
      <PriceBreakdown :value="price" />
    </div>
  </div>
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
  computed: mapState('estimate', ['price', 'carbon'])
}
</script>

<style lang="scss" scoped>
.fields,
.field {
  align-items: flex-start;
}
</style>
