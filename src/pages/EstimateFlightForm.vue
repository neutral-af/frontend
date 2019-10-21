<template>
  <form
    class="estimate-flight-form"
    @submit.prevent="onSubmit"
  >
    <AirportField
      v-if="step === 'departure'"
      id="departure"
      key="departure"
      label="Departure airport"
      placeholder="e.g. Milan, Malpensa or MXP"
      :value="flight.departure ? flight.departure.name : ''"
      @update="updateDeparture($event)"
    />
    <AirportField
      v-if="step === 'arrival'"
      id="arrival"
      key="arrival"
      label="Arrival airport"
      placeholder="e.g. Toronto, Pearson or YYZ"
      :value="flight.arrival ? flight.arrival.name : ''"
      @update="updateArrival($event)"
    />
    <PassengersField
      v-if="step === 'passengers'"
      name="passengers"
      :value="flight.passengers"
      @update="updatePassengers($event)"
    />
    <div class="has-text-centered">
      <RoundedButton
        v-if="step === 'passengers'"
        native-type="submit"
        type="is-primary"
        size="is-large"
        inverted
        outlined
        icon-left="check"
      >
        Confirm
      </RoundedButton>
    </div>
    </div>
  </form>
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
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('estimateForm', {
      step: 'currentStep',
      newFlight: 'newFlight'
    }),
    mode () {
      return this.id ? 'edit' : 'add'
    },
    flight () {
      return this.mode === 'edit'
        ? this.$store.getters['estimateForm/flightById'](this.id)
        : this.newFlight
    }
  },
  created () {
    if (!this.flight) {
      this.$router.replace({ name: 'estimate-home' })
      return
    }
    this.setStep('departure')
  },
  methods: {
    ...mapMutations('estimateForm', {
      setStep: 'setCurrentStep',
      addFlight: 'addFlight',
      updateFlight: 'updateFlight',
      updateNewFlight: 'updateNewFlight',
      resetNewFlight: 'resetNewFlight'
    }),
    update (name, value) {
      const data = { [name]: value }
      if (this.mode === 'edit') {
        this.updateFlight({ id: this.id, data })
      } else {
        this.updateNewFlight(data)
      }
    },
    updateDeparture (value) {
      this.update('departure', value)
      this.setStep('arrival')
    },
    updateArrival (value) {
      this.update('arrival', value)
      this.setStep('passengers')
    },
    updatePassengers (value) {
      this.update('passengers', value)
    },
    onSubmit () {
      if (this.mode === 'add') {
        this.addFlight(this.flight)
        this.resetNewFlight()
      }
      this.$router.push({ name: 'estimate-home' })
    }
  }
}
</script>
