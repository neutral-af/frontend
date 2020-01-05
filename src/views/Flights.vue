<template>
  <div class="Flights">
    <template v-if="flightsCount > 0">
      <EstimateFlight
        v-for="(flight, id) in flights"
        :id="id"
        :key="id"
        v-bind="flight"
        :removable="removable"
      />
      <hr>
    </template>
    <EstimateActions />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EstimateFlight from '@/components/organisms/EstimateFlight'
import EstimateActions from '@/components/organisms/EstimateActions'

export default {
  components: {
    EstimateFlight,
    EstimateActions
  },
  computed: {
    ...mapState('estimateForm', ['flights']),
    ...mapGetters('estimateForm', ['flightsCount']),
    removable () {
      return this.flightsCount > 1
    }
  }
}
</script>
