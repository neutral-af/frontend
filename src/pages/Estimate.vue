<template>
  <HeroSection class="is-dark estimate">
    <MainNav slot="head" />
    <EstimateSummary />
    <div class="container estimate-view">
      <h1 class="title estimate-title">
        {{ title }}
      </h1>
      <EstimateFlightForm
        v-if="step === 'flight'"
        @complete="onFlightComplete"
      />
      <div v-else-if="step === 'actions'">
        <template v-if="flightsCount > 0">
          <EstimateFlight
            v-for="flight in flights"
            :key="flight.id"
            v-bind="flight"
            :removable="removable"
            @edit="onEditFlight"
            @remove="onRemoveFlight"
          />
          <hr>
        </template>
        <EstimateActions
          @add="onAddFlight"
          @next="onNext"
        />
      </div>
      <EstimateCheckout v-else-if="step === 'checkout'" />
    </div>
    <MainFoot slot="foot" />
  </HeroSection>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { isValidFlight } from '@/validators'
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'
import HeroSection from '@/components/organisms/HeroSection'
import EstimateSummary from '@/components/organisms/EstimateSummary'
import EstimateFlightForm from '@/components/organisms/EstimateFlightForm'
import EstimateFlight from '@/components/organisms/EstimateFlight'
import EstimateActions from '@/components/organisms/EstimateActions'
import EstimateCheckout from '@/components/organisms/EstimateCheckout'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    MainNav,
    MainFoot,
    HeroSection,
    EstimateSummary,
    EstimateFlightForm,
    EstimateFlight,
    EstimateActions,
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
    ...mapState(['userCurrency']),
    ...mapState('estimate', ['creating', 'step']),
    ...mapState('estimateForm', ['flights', 'currentFlight']),
    ...mapGetters('estimateForm', ['flightsCount', 'flightsByICAO']),
    title () {
      return 'Estimate'
    },
    removable () {
      return this.flightsCount > 1
    }
  },
  async created () {
    await this.loadInitialFlights()
    this.unwatchers = [
      // this.$watch('flights', this.onUpdate.bind(this)),
      this.$watch('userCurrency', this.onUpdate.bind(this))
    ]
  },
  beforeDestroy () {
    if (this.unwatchers) {
      this.unwatchers.forEach(unwatch => unwatch())
    }
  },
  methods: {
    ...mapMutations('estimate', ['setStep']),
    ...mapMutations('estimateForm', [
      'addFlight',
      'removeFlight',
      'setCurrentFlight'
    ]),
    ...mapActions('estimateForm', ['loadFlights']),
    async loadInitialFlights () {
      if (!this.initialFlights) {
        return
      }
      try {
        const flights = JSON.parse(atob(this.initialFlights))
        return this.loadFlights(flights)
      } catch (err) {
        console.error(`Error when decoding or loading flight data from URL: ${err}`)
      }
    },
    updateUrl () {
      const flights = btoa(JSON.stringify(this.flightsByICAO))
      this.$router.replace({ ...this.$route, query: { flights } })
    },
    onUpdate () {
      this.create()
      this.updateUrl()
    },
    onFlightComplete () {
      this.onUpdate()
      this.setStep('actions')
    },
    onAddFlight () {
      this.addFlight()
      this.setCurrentFlight(this.currentFlight + 1)
      this.setStep('flight')
    },
    onEditFlight (id) {
      this.setCurrentFlight(id)
      this.setStep('flight')
    },
    onRemoveFlight (id) {
      this.removeFlight(id)
      this.setCurrentFlight(1)
    },
    onNext () {
      this.setStep('checkout')
    },
    showError (message = '') {
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        onAction: this.create.bind(this)
      })
    },
    validate () {
      return Object.values(this.flights).every(isValidFlight)
    },
    async create () {
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

<style lang="scss" scoped>
.estimate {
  &-view {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-title {
    @extend %sr-only;
  }
}
</style>
