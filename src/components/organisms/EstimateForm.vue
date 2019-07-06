<template>
  <form
    action=""
    @submit.prevent="send"
  >
    <div class="columns is-centered is-multiline">
      <div
        v-for="flight in flights"
        :key="flight.id"
        class="column is-half"
      >
        <EstimateFormFlight
          :removeable="flight.id > 1"
          v-bind="flight"
        />
      </div>
      <div class="column is-half">
        <a
          class="card add-flight"
          @click="addFlight"
        >
          <b-icon icon="plus" /> Add flight
        </a>
      </div>
    </div>
    <div class="field actions">
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

<style lang="scss">
.add-flight {
  display: block;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  text-align: center;
}
</style>
