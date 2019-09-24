<template>
  <BField class="level is-mobile fields">
    <div class="level-item">
      <CarbonField :value="carbon" />
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
  computed: mapState('estimate', ['price', 'carbon'])
}
</script>

<style lang="scss" scoped>
.fields,
.field {
  align-items: flex-start;
}
</style>
