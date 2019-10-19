<template>
  <div class="estimate-flight">
    <AirportField2
      v-if="step === 'departure'"
      :key="`flight-${id}-departure`"
      label="Departure airport"
      :name="`flight-${id}-departure`"
      placeholder="e.g. Milan, Malpensa or MXP"
      :value="departure ? departure.name : ''"
      @update="updateDeparture($event)"
    />
    <AirportField2
      v-if="step === 'arrival'"
      :key="`flight-${id}-arrival`"
      label="Arrival airport"
      :name="`flight-${id}-arrival`"
      placeholder="e.g. Toronto, Pearson or YYZ"
      :value="arrival ? arrival.name : ''"
      @update="updateArrival($event)"
    />
    <PassengersField2
      v-if="step === 'passengers'"
      :name="`flight-${id}-passengers`"
      :value="passengers"
      @update="updatePassengers($event)"
    />
    <div class="has-text-centered">
      <BButton
        v-if="step === 'passengers'"
        type="is-primary"
        size="is-large"
        inverted
        outlined
        @click="onConfirm"
      >
        Confirm
      </BButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import AirportField2 from '@/components/molecules/AirportField2'
// import DateField from '@/components/molecules/DateField'
// import FlightNumberField from '@/components/molecules/FlightNumberField'
import PassengersField2 from '@/components/molecules/PassengersField2'

export default {
  components: {
    AirportField2,
    // DateField,
    // FlightNumberField,
    PassengersField2
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    departure: {
      type: Object,
      default: null
    },
    arrival: {
      type: Object,
      default: null
    },
    passengers: {
      type: Number,
      required: true
    }
  },
  computed: mapState('estimateForm', {
    step: 'currentStep'
  }),
  methods: {
    ...mapMutations('estimateForm', {
      setStep: 'setCurrentStep'
    }),
    update (name, value) {
      const data = { [name]: value }
      this.$store.commit('estimateForm/updateFlight', { id: this.id, data })
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
    onConfirm () {
      this.$emit('complete')
    },
    remove () {
      this.$store.commit('estimateForm/removeFlight', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.fields {
  align-items: last baseline;
}
</style>
