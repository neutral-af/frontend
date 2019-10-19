<template>
  <div class="hero is-dark is-fullheight wrapper">
    <header class="hero-head">
      <MainNav />
    </header>
    <div class="hero-body view">
      <EstimateFlight
        v-if="step === 'flights'"
        v-bind="flight"
        @complete="onFlightComplete"
      />
      <EstimatePreview v-if="step === 'preview'" />
    </div>
    <div class="hero-foot">
      <MainFoot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'
import EstimateFlight from '@/components/organisms/EstimateFlight'
import EstimatePreview from '@/components/organisms/EstimatePreview'

export default {
  components: {
    MainNav,
    MainFoot,
    EstimateFlight,
    EstimatePreview
  },
  data () {
    return {
      step: 'flights'
    }
  },
  created () {
    this.showNonProdEnvWarning()
  },
  computed: {
    ...mapState('estimateForm', ['flights', 'currentFlight']),
    flight () {
      return this.flights[this.currentFlight]
    }
  },
  methods: {
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
    onFlightComplete () {
      this.step = 'preview'
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
