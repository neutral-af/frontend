<template>
  <main>
    <h1 class="title">
      Estimate
    </h1>
    <div class="box">
      <form
        novalidate
        class="estimate-form"
        @submit.prevent="onSubmit"
      >
        <EstimateFlightFields
          v-for="flight in flights"
          :key="flight.id"
          :removeable="flight.id > 1"
          v-bind="flight"
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
        <BField>
          <BButton
            type="is-primary"
            size="is-medium"
            :disabled="!hasEstimate"
            :class="{ 'is-loading': creating }"
          >
            Confirm
          </BButton>
        </BField>
      </form>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import EstimateFlightFields from '@/components/organisms/EstimateFlightFields'
import EstimatePreview from '@/components/organisms/EstimatePreview'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    EstimateFlightFields,
    EstimatePreview
  },
  computed: {
    ...mapState('estimate', ['creating']),
    ...mapState('estimateForm', ['flights']),
    hasEstimate () {
      return !!this.$store.state.estimate.id
    }
  },
  created () {
    this.$watch(({ flights }) => (
      flights
        .map(({ departure, arrival, date, passengers }) => [departure, arrival, date, passengers].join())
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
        // indefinite: true,
        onAction: this.update.bind(this)
      })
    },
    validate () {
      return this.flights.every(({ departure, arrival, passengers }) => (
        !!departure &&
        !!arrival &&
        !!passengers
      ))
    },
    async update () {
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
    }
  }
}
</script>
