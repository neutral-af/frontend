<template>
  <main>
    <h1 class="title">
      Estimate
    </h1>
    <div class="box">
      <EstimateFlightFields
        v-for="flight in flights"
        :key="flight.id"
        :removeable="flights.length > 1"
        v-bind="flight"
        class="flight-fields"
      />
      <BField>
        <BButton
          icon-left="plus"
          @click="addFlight"
        >
          Add flight
        </BButton>
      </BField>
      <hr>
      <EstimatePreview />
      <BField v-if="!confirmed">
        <BButton
          type="is-primary"
          size="is-medium"
          :disabled="!hasEstimate"
          :class="{ 'is-loading': creating }"
          @click="confirm"
        >
          Confirm
        </BButton>
      </BField>

      <template v-if="confirmed">
        <hr>
        <EstimateCheckout />
      </template>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import { isValidFlight } from '@/validators'
import EstimateFlightFields from '@/components/organisms/EstimateFlightFields'
import EstimatePreview from '@/components/organisms/EstimatePreview'
import EstimateCheckout from '@/components/organisms/EstimateCheckout'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    EstimateFlightFields,
    EstimatePreview,
    EstimateCheckout
  },
  computed: {
    ...mapState('estimate', ['creating', 'confirmed']),
    ...mapState('estimateForm', ['flights']),
    hasEstimate () {
      return !!this.$store.state.estimate.id
    }
  },
  created () {
    this.$watch(({ flights }) => (
      flights
        .map(({ departure, arrival, date, passengers }) => (
          [
            departure ? departure.icao : null,
            arrival ? arrival.icao : null,
            date,
            passengers
          ].join()
        ))
        .join()
    ), this.update)
  },
  methods: {
    addFlight () {
      this.$store.commit('estimateForm/addFlight')
    },
    showError (message = '') {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        onAction: this.update.bind(this)
      })
    },
    validate () {
      return this.flights.every(isValidFlight)
    },
    async update (value) {
      console.log('update', value)
      if (this.creating) {
        return
      }
      const valid = this.validate()
      if (!valid) {
        return
      }
      try {
        await this.$store.dispatch('estimate/create')
      } catch (err) {
        this.showError('Ouch, there was an error while trying to get an estimate')
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    },
    confirm () {
      this.$store.commit('estimate/setConfirmed', true)
    }
  }
}
</script>

<style type="scss" scoped>
.flight-fields {

}
</style>
