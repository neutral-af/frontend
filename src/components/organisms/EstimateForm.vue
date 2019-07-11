<template>
  <form @submit.prevent="openEstimateModal">
    <div class="columns is-centered">
      <div class="column is-half">
        <EstimateFormFlight
          v-for="flight in flights"
          :key="flight.id"
          :removeable="flight.id > 1"
          v-bind="flight"
        />
      </div>
    </div>
    <div class="field actions">
      <BButton
        type="button"
        icon-left="plus"
        @click="addFlight"
      >
        Add flight
      </BButton>
    </div>
    <div class="field actions">
      <BButton
        native-type="submit"
        type="is-primary"
        size="is-large"
        :class="{ 'is-loading': fetching }"
      >
        Estimate
      </BButton>

      <b-modal
        :active.sync="estimatePromptModalActive"
        has-modal-card
      >
        <EstimatePrompt />
      </b-modal>
    </div>
  </form>
</template>

<script>
import EstimateFormFlight from '@/components/molecules/EstimateFormFlight'
import EstimatePrompt from '@/components/organisms/EstimatePrompt'

export default {
  components: {
    EstimateFormFlight,
    EstimatePrompt
  },
  data () {
    return {
      estimatePromptModalActive: false,
      withFlightNumber: true,
      fetching: false,
      estimate: {}
    }
  },
  computed: {
    flights () {
      return this.$store.state.estimateForm.flights.map(({ id, type }) => ({ id, type }))
    }
  },
  methods: {
    addFlight () {
      this.$store.commit('estimateForm/addFlight')
    },
    async openEstimateModal () {
      this.fetching = true
      await this.getEstimate()
      this.fetching = false
      this.estimatePromptModalActive = true
    },
    async getEstimate () {
      console.log(this.flights)
      const flights = [
        { departure: 'YYZ', arrival: 'LHR' }
      ]
      await this.$store.dispatch('estimate/create', { flights, currency: 'EUR' })
    }
  }
}
</script>

<style lang="scss">
.actions {
  text-align: center;
}
</style>
