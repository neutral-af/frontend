<template>
  <div class="estimate-flight-form">
    <AirportField
      v-if="currentStep === 'departure'"
      :key="`flight-${flight.id}-departure`"
      :name="`flight-${flight.id}-departure`"
      label="Departure airport"
      placeholder="e.g. Milan, Malpensa or MXP"
      :value="flight.departure ? flight.departure.name : ''"
      @update="updateDeparture($event)"
    />
    <AirportField
      v-if="currentStep === 'arrival'"
      :key="`flight-${flight.id}-arrival`"
      :name="`flight-${flight.id}-arrival`"
      label="Arrival airport"
      placeholder="e.g. Toronto, Pearson or YYZ"
      :value="flight.arrival ? flight.arrival.name : ''"
      @update="updateArrival($event)"
    />
    <PassengersField
      v-if="currentStep === 'passengers'"
      :name="`flight-${flight.id}-passengers`"
      :value="flight.passengers"
      @update="updatePassengers($event)"
    />
    <div class="has-text-centered">
      <RoundedButton
        v-if="currentStep === 'passengers'"
        type="is-primary"
        size="is-large"
        inverted
        outlined
        icon-left="check"
        @click="onConfirm"
      >
        Confirm
      </RoundedButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import AirportField from '@/components/molecules/AirportField'
// import DateField from '@/components/molecules/DateField'
// import FlightNumberField from '@/components/molecules/FlightNumberField'
import PassengersField from '@/components/molecules/PassengersField'

export default {
  components: {
    AirportField,
    // DateField,
    // FlightNumberField,
    PassengersField
  },
  computed: {
    ...mapState('estimateForm', ['currentFlight', 'currentStep']),
    flight () {
      return this.$store.state.estimateForm.flights[this.currentFlight]
    }
  },
  created () {
    this.setCurrentStep('departure')
  },
  methods: {
    ...mapMutations('estimateForm', ['setCurrentStep']),
    update (name, value) {
      const data = { [name]: value }
      this.$store.commit('estimateForm/updateFlight', { id: this.currentFlight, data })
    },
    updateDeparture (value) {
      this.update('departure', value)
      this.setCurrentStep('arrival')
    },
    updateArrival (value) {
      this.update('arrival', value)
      this.setCurrentStep('passengers')
    },
    updatePassengers (value) {
      this.update('passengers', value)
    },
    onConfirm () {
      this.$emit('complete')
      this.setCurrentStep('departure')
    },
    remove () {
      this.$store.commit('estimateForm/removeFlight', this.id)
    }
  }
}
</script>
