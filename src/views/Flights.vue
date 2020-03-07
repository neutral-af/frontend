<template>
  <div>
    <Title as="h1">
      {{ title }}
    </Title>
    <div
      v-if="flightsCount > 0"
      class="flex flex-col items-center justify-center mb-6"
    >
      <EstimateFlight
        v-for="(flight, id) in flights"
        :id="id"
        :key="id"
        v-bind="flight"
        :removable="removable"
      />
    </div>
    <EstimateActions />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EstimateFlight from '@/components/organisms/EstimateFlight'
import EstimateActions from '@/components/organisms/EstimateActions'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    EstimateFlight,
    EstimateActions
  },
  computed: {
    ...mapState('estimateForm', ['flights']),
    ...mapGetters('estimateForm', ['flightsCount']),
    title () {
      return 'Your flights'
    },
    removable () {
      return this.flightsCount > 1
    }
  }
}
</script>
