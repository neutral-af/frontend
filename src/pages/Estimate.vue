<template>
  <div>
    <h1 class="title">
      Estimate
    </h1>
    <div class="box">
      <form @submit.prevent="createEstimate">
        <div class="flights">
          <div
            v-for="flight in flights"
            :key="flight.id"
            class="field flight"
          >
            <EstimateFormFlight
              :removeable="flight.id > 1"
              v-bind="flight"
            />
            <hr class="separator">
          </div>
        </div>
        <hr>
        <BField>
          <BButton
            type="button"
            icon-left="plus"
            @click="addFlight"
          >
            Add flight
          </BButton>
        </BField>
        <BField>
          <BButton
            native-type="submit"
            type="is-primary"
            size="is-medium"
            :class="{ 'is-loading': fetching }"
          >
            Calculate
          </BButton>
        </BField>
        <BModal
          :active.sync="promptActive"
          has-modal-card
        >
          <EstimatePrompt />
        </BModal>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EstimateFormFlight from '@/components/molecules/EstimateFormFlight'
import EstimatePrompt from '@/components/organisms/EstimatePrompt'

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    EstimateFormFlight,
    EstimatePrompt
  },
  data () {
    return {
      promptActive: false,
      estimate: {}
    }
  },
  computed: {
    ...mapState('estimate', ['fetching']),
    flights () {
      return this.$store.state.estimateForm.flights.map(({ id, type }) => ({ id, type }))
    }
  },
  methods: {
    addFlight () {
      this.$store.commit('estimateForm/addFlight')
    },
    showError (message = '') {
      this.$snackbar.open({
        message,
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Retry',
        indefinite: true,
        onAction: this.createEstimate.bind(this)
      })
    },
    async createEstimate () {
      const flights = [{ departure: 'YYZ', arrival: 'LHR' }]
      try {
        await this.$store.dispatch('estimate/create', { flights, currency: 'EUR' })
        this.promptActive = true
      } catch (err) {
        this.showError('Ouch, there was an error while trying to get an estimate')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flight:last-child {
  .separator {
    display: none;
  }
}
</style>
