<template>
  <main>
    <h1 class="title">
      Estimate
    </h1>
    <div class="box">
      <EstimateFlightFields
        v-for="(flight, id) in flights"
        :id="id"
        :key="id"
        :removable="removable"
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
import { mapState, mapMutations } from 'vuex'

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
  props: {
    initialFlights: {
      type: String,
      default: ''
    },
    initialUserCurrency: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('estimate', ['creating', 'confirmed']),
    ...mapState('estimateForm', ['flights']),
    removable () {
      return this.totalFlights > 1
    },
    hasEstimate () {
      return !!this.$store.state.estimate.id
    },
    totalFlights () {
      return Object.keys(this.flights).length
    }
  },
  created () {
    this.storeFromInitial()
    this.unwatch = this.$watch('flights', this.onFlightsUpdate.bind(this))
  },
  beforeDestroy () {
    if (this.unwatch) {
      this.unwatch()
    }
  },
  methods: {
    ...mapMutations('estimateForm', ['addFlight']),
    storeFromInitial () {
      // if (this.initialFlights) {
      //   try {
      //     const flights = JSON.parse(atob(this.initialFlights))
      //     if (flights.every(isValidFlight)) {
      //       this.$store.commit()
      //     }
      //   } catch (err) {
      //     //
      //   }
      // }
      // if (this.initialUserCurrency) {
      // }
    },
    updateUrl () {
      const flights = btoa(JSON.stringify(this.flights))
      this.$router.replace({ ...this.$route, query: { flights } })
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
      return Object.values(this.flights).every(isValidFlight)
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
    },
    onFlightsUpdate () {
      this.updateUrl()
      this.update()
    },
    confirm () {
      this.$store.commit('estimate/setConfirmed', true)
    }
  }
}
</script>
