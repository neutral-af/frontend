<template>
  <form @submit.prevent="send">
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
      >
        Estimate
      </BButton>
    </div>
  </form>
</template>

<script>
import EstimateFormFlight from '@/components/molecules/EstimateFormFlight'

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
      const valid = await this.$validator.validateAll()
      if (valid) {
        this.$fetch('/other-page')
      }
    }
  }
}
</script>

<style lang="scss">
.actions {
  text-align: center;
}
</style>
