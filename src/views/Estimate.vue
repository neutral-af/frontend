<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col flex-grow">
      <MainHead />
      <EstimateSummary v-if="summaryShown" />
      <RouterView class="container text-center" />
      <div class="container text-center pt-6 pb-10">
        <Button
          v-if="$route.name !== 'flights'"
          as="RouterLink"
          :to="{ name: 'flights', query: this.$route.query }"
          icon-left="arrow-left"
        >
          Back to Flights
        </Button>
      </div>
    </div>
    <MainFoot compact />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { areValidFlights } from '@/utils/validators'
import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'
import EstimateSummary from '@/components/organisms/EstimateSummary'

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    MainHead,
    MainFoot,
    EstimateSummary
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
    ...mapState('estimate', ['flights', 'creating', 'flights']),
    ...mapGetters('estimate', ['flightsCount', 'flightsByICAO']),
    title () {
      return 'Estimate'
    },
    summaryShown () {
      return this.$route.name !== 'success'
    }
  },
  async created () {
    // await this.loadInitialFlights()
    this.unwatchers = [
      this.$watch('userCurrency', this.create.bind(this))
    ]
  },
  beforeDestroy () {
    if (this.unwatchers) {
      this.unwatchers.forEach(unwatch => unwatch())
    }
  },
  methods: {
    ...mapActions('estimate', ['loadFlights']),
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
      } catch (err) {
        if (err.response && err.response.errors && err.response.errors.length > 0) {
          const [{ message }] = err.response.errors
          this.$toasted.show(message)
          // message,
          // type: 'is-danger',
          // position: 'is-bottom',
          // actionText: 'Retry',
          // onAction: this.create.bind(this)
        }
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>
