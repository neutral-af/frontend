<template>
  <HeroSection class="is-dark estimate">
    <MainNav slot="head" />
    <EstimateSummary v-if="summaryShown" />
    <EstimateBackground />
    <div class="container estimate-view">
      <h1 class="title estimate-title">
        {{ title }}
      </h1>
      <RouterView />
    </div>
    <MainFoot slot="foot" />
  </HeroSection>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { trackEvent } from '@/tracking'
import { areValidFlights } from '@/utils/validators'
import EstimateBackground from '@/components/atoms/EstimateBackground'
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'
import HeroSection from '@/components/organisms/HeroSection'
import EstimateSummary from '@/components/organisms/EstimateSummary'

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
    EstimateBackground
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
    ...mapState('estimateForm', ['flights']),
    ...mapGetters('estimateForm', ['flightsCount', 'flightsByICAO']),
    title () {
      return 'Estimate'
    },
    summaryShown () {
      return this.$route.name !== 'success'
    }
  },
  async created () {
    await this.loadInitialFlights()
    this.unwatchers = [
      this.$watch('flights', this.onUpdate.bind(this), { immediate: true }),
      this.$watch('userCurrency', this.onUpdate.bind(this))
    ]
    this.setInitialPage()
  },
  beforeDestroy () {
    if (this.unwatchers) {
      this.unwatchers.forEach(unwatch => unwatch())
    }
  },
  methods: {
    ...mapActions('estimateForm', ['loadFlights']),
    async loadInitialFlights () {
      if (!this.initialFlights) {
        return
      }
      try {
        const converted = atob(this.initialFlights)
        const flights = JSON.parse(converted)
        await this.loadFlights(flights)
      } catch (err) {
        console.log(err)
        console.error(`Error when decoding or loading flight data from URL: ${err}`)
      }
    },
    setInitialPage () {
      if (this.flightsCount === 0 && this.$route.matched.every(({ name }) => name !== 'add-flight')) {
        this.$router.replace({ name: 'add-flight' })
      }
    },
    updateUrl () {
      const query = {}
      if (this.flightsByICAO.length > 0) {
        query.flights = btoa(JSON.stringify(this.flightsByICAO))
      }
      this.$router.replace({ name: this.$route.name, query })
    },
    onUpdate () {
      this.create()
      this.updateUrl()
    },
    showError (message = '') {
      trackEvent('estimateError', {})
      this.$buefy.snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        onAction: this.create.bind(this)
      })
    },
    async create () {
      if (this.creating) {
        return
      }
      const flights = Object.values(this.flights)
      if (flights.length === 0) {
        return
      }
      if (!areValidFlights(flights)) {
        return
      }
      try {
        await this.$store.dispatch('estimate/create')
        trackEvent('estimateCreated', {})
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
