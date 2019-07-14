<template>
  <form @submit.prevent="onSubmit">
    <EstimateFormFlight
      v-for="flight in flights"
      :key="flight.id"
      :removeable="flight.id > 1"
      v-bind="flight"
    />
    <div class="field actions">
      <BButton
        type="button"
        icon-left="plus"
        @click="addFlight"
      >
        Add flight
      </BButton>
    </div>
    <div class="field actions">
      <BButton
        native-type="submit"
        type="is-primary"
        size="is-large"
        :class="{ 'is-loading': fetching }"
      >
        Estimate
      </BButton>
    </div>
    <BNotification
      :active="error"
      type="is-danger"
      closable
      aria-close-label="Close"
    >
      {{ errorMessage }}
    </BNotification>
    <BModal
      :active.sync="promptActive"
      has-modal-card
    >
      <EstimatePrompt />
    </BModal>
  </form>
</template>

<script>
import { mapState } from 'vuex'

import EstimateFormFlight from '@/components/molecules/EstimateFormFlight'
import EstimatePrompt from '@/components/organisms/EstimatePrompt'

export default {
  components: {
    EstimateFormFlight,
    EstimatePrompt
  },
  data () {
    return {
      promptActive: false,
      estimate: {},
      error: false,
      errorMessage: ''
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
    setError (message = '') {
      this.error = !!message
      this.errorMessage = message
    },
    async onSubmit () {
      const flights = [{ departure: 'YYZ', arrival: 'LHR' }]
      this.setError('')
      try {
        await this.$store.dispatch('estimate/create', { flights, currency: 'EUR' })
        this.promptActive = true
      } catch (err) {
        this.setError(err)
      }
    }
  }
}
</script>

<style lang="scss">
.actions {
  text-align: center;
}
</style>
