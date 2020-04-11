<template>
  <div>
    <Title as="h1">
      {{ title }}
    </Title>
    <div
      class="flex flex-col items-center justify-center mb-6"
    >
      <template v-if="flightsCount > 0">
        <EstimateFlight
          v-for="(flight, id) in flights"
          :id="id"
          :key="id"
          v-bind="flight"
          :removable="removable"
        />
      </template>
      <template v-else>
        There are no flights right now.
      </template>
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
