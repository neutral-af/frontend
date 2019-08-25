<template>
  <section class="estimate-form-flight">
    <BField
      grouped
      position="is-centered"
    >
      <DateField
        :name="`flight-${id}-date`"
        :value="flight.date"
        @update="updateDate"
      />
      <PassengersField
        :name="`flight-${id}-passengers`"
        :value="flight.passengers"
        @update="updatePassengers"
      />
    </BField>
    <!-- <a
      v-if="removeable"
      class="card-header-icon"
      @click="remove"
    >
      <BIcon icon="trash" />
    </a> -->
    <!-- <template v-if="flight.type === 'number'">
      <FlightNumberField
        :name="`flight-${id}-number`"
        :value="flight.number"
        @update="updateNumber"
      />
      <p class="field">
        Missing flight number? Insert <a @click="toggleType">airports</a> instead
      </p>
    </template> -->
    <!-- <template v-else> -->
    <BField grouped>
      <AirportField
        label="Departure airport"
        :name="`flight-${id}-from`"
        placeholder="e.g. Milan, Malpensa or MXP"
        :value="flight.departure ? flight.departure.name : ''"
        @update="updateDeparture"
      />
      <AirportField
        label="Arrival airport"
        :name="`flight-${id}-to`"
        placeholder="e.g. Toronto, Pearson or YYZ"
        :value="flight.arrival ? flight.arrival.name : ''"
        @update="updateArrival"
      />
    </BField>
    <!-- <p class="field">
      Have a <a @click="toggleType">flight number</a> instead?
    </p>
    </template> -->
  </section>
</template>

<script>
import AirportField from '@/components/molecules/AirportField'
import DateField from '@/components/molecules/DateField'
// import FlightNumberField from '@/components/molecules/FlightNumberField'
import PassengersField from '@/components/molecules/PassengersField'

export default {
  components: {
    AirportField,
    DateField,
    // FlightNumberField,
    PassengersField
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    removeable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    flight () {
      return this.$store.getters['estimateForm/getFlight'](this.id)
    }
  },
  methods: {
    update (data) {
      this.$store.commit('estimateForm/updateFlight', { id: this.id, data })
    },
    // toggleType () {
    //   const type = this.flight.type === 'number' ? 'locations' : 'number'
    //   this.update({ type })
    // },
    updateNumber (value) {
      this.update({ number: value })
    },
    updateFrom (value) {
      this.update({ from: value })
    },
    updateTo (value) {
      this.update({ to: value })
    },
    updateDate (value) {
      this.update({ date: value })
    },
    updatePassengers (value) {
      this.update({ passengers: value })
    },
    remove () {
      this.$store.commit('estimateForm/removeFlight', this.id)
    }
  }
}
</script>
