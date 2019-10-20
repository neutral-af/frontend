<template>
  <Layout class="estimate">
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
  </Layout>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import { isValidFlight } from '@/validators'
import Layout from '@/layouts/HeroOnly'
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
    EstimateCheckout,
    Layout
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
    ...mapState(['userCurrency']),
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
  async created () {
    this.showNonProdEnvWarning()
    this.unwatch = this.$watch('flights', this.onWatchUpdate.bind(this))
    this.unwatch = this.$watch('userCurrency', this.onWatchUpdate.bind(this))
    if (this.initialFlights) {
      try {
        const dataFromURL = JSON.parse(atob(this.initialFlights))
        await this.loadFlights(dataFromURL)
      } catch (e) {
        console.error(`Error when decoding or loading flight data from URL: ${e}`)
      }
    }
  },
  beforeDestroy () {
    if (this.unwatch) {
      this.unwatch()
    }
  },
  methods: {
    ...mapMutations('estimateForm', ['addFlight']),
    ...mapActions('estimateForm', ['loadFlights']),
    ...mapGetters('estimateForm', ['getFlightsByICAO']),
    showNonProdEnvWarning () {
      if (process.env.VUE_APP_ENV !== 'prod') {
        this.$buefy.notification.open({
          message: `Environment is <strong>${process.env.VUE_APP_ENV}</strong>, do not use a real credit card number!`,
          position: 'is-bottom',
          type: 'is-warning',
          closable: false,
          indefinite: true
        })
      }
    },
    updateUrl () {
      const flights = btoa(JSON.stringify(this.getFlightsByICAO()))
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
    onWatchUpdate () {
      this.updateUrl()
      this.update()
    },
    confirm () {
      this.$store.commit('estimate/setConfirmed', true)
    }
  }
}
</script>
