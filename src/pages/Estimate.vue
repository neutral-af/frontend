<template>
  <div class="hero is-dark is-fullheight estimate">
    <header class="hero-head">
      <MainNav has-preview />
    </header>
    <div class="hero-body estimate-view">
      <div>
        <h1 class="title estimate-title">
          Estimate
        </h1>
        <EstimateFlight
          v-if="step === 'flight'"
          v-bind="flight"
          @complete="onFlightComplete"
        />
        <EstimateActions v-else-if="step === 'actions'" />
        <EstimateCheckout v-else-if="step === 'checkout'" />
      </div>
    </div>
    <footer class="hero-foot">
      <MainFoot />
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { isValidFlight } from '@/validators'
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'
import EstimateFlight from '@/components/organisms/EstimateFlight'
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
    EstimateFlight,
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
    flight () {
      return this.flights[this.currentFlight]
    },
    hasEstimate () {
      return !!this.$store.state.estimate.id
    }
  },
  created () {
    this.showNonProdEnvWarning()
    this.storeFromInitial()
    this.unwatchers = [
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
    ...mapMutations('estimateForm', ['addFlight']),
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
    onUpdate () {
      this.create()
      this.updateUrl()
    },
    onFlightComplete () {
      this.onUpdate()
      this.setStep('actions')
    },
    onConfirm () {
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

    @include mobile {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  &-title {
    @extend %sr-only;
  }
}
</style>
