<template>
  <form
    action=""
    @submit.prevent="send"
  >
    <EstimateFormFlight
      v-for="flight in flights"
      :key="flight.id"
      :removeable="flight.id > 1"
      v-bind="flight"
    />
    <div class="field">
      <button
        type="button"
        class="button is-medium"
        @click="addFlight"
      >
        Add flight
      </button>
    </div>
    <div class="field">
      <button
        type="submit"
        class="button is-primary is-large"
      >
        Estimate
      </button>
    </div>
  </form>
</template>

<script>
import EstimateFormFlight from '~/components/molecules/EstimateFormFlight'

export default {
  components: {
    EstimateFormFlight
  },
  data () {
    return {
      withFlightNumber: true
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
    async send () {
      this.$fetch('/other-page')
    }
  }
}
</script>
