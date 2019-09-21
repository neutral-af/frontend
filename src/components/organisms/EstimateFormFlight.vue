<template>
  <section class="estimate-form-flight">
    <!-- <template v-if="flight.type === 'number'">
      <BField position="is-centered">
        <DateField
          :name="`flight-${id}-date`"
          :value="flight.date"
          @update="update('date', $event)"
        />
      </BField>
      <FlightNumberField
        :name="`flight-${id}-flight-number`"
        :value="flight.flightNnumber"
        @update="update('flightNumber', $event)"
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
        @update="update('departure', $event)"
      />
      <AirportField
        label="Arrival airport"
        :name="`flight-${id}-to`"
        placeholder="e.g. Toronto, Pearson or YYZ"
        :value="flight.arrival ? flight.arrival.name : ''"
        @update="update('arrival', $event)"
      />
    </BField>
    <!-- <BField> -->
    <PassengersField
      :name="`flight-${id}-passengers`"
      :value="flight.passengers"
      @update="update('passengers', $event)"
    />
    <!-- </BField> -->

    <!-- <p class="field">
      Have a <a @click="toggleType">flight number</a> instead?
    </p>
    </template>
    -->
    <BButton
      v-if="removeable"
      icon-left="trash"
      @click="remove"
    >
      Remove flight
    </BButton>
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
    update (name, value) {
      const data = { [name]: value }
      this.$store.commit('estimateForm/updateFlight', { id: this.id, data })
    },
    // toggleType () {
    //   const type = this.flight.type === 'number' ? 'locations' : 'number'
    //   this.update({ type })
    // },
    remove () {
      this.$store.commit('estimateForm/removeFlight', this.id)
    }
  }
}
</script>
