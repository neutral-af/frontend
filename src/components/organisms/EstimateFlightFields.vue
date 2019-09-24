<template>
  <div class="estimate-flight-fields">
    <!-- <template v-if="type === 'number'">
      <BField position="is-centered">
        <DateField
          :name="`flight-${id}-date`"
          :value="date"
          @update="update('date', $event)"
        />
      </BField>
      <FlightNumberField
        :name="`flight-${id}-flight-number`"
        :value="flightNumber"
        @update="update('flightNumber', $event)"
      />
  >
        Missing flight number? Insert <a @click="toggleType">airports</a> instead
      </p>
    </template> -->
    <!-- <template v-else> -->
    <BField
      grouped
      group-multiline
      position="is-centered"
      class="fields"
    >
      <AirportField
        label="Departure airport"
        :name="`flight-${id}-from`"
        placeholder="e.g. Milan, Malpensa or MXP"
        :value="departure ? departure.name : ''"
        @update="update('departure', $event)"
      />
      <AirportField
        label="Arrival airport"
        :name="`flight-${id}-to`"
        placeholder="e.g. Toronto, Pearson or YYZ"
        :value="arrival ? arrival.name : ''"
        @update="update('arrival', $event)"
      />
      <PassengersField
        :name="`flight-${id}-passengers`"
        :value="passengers"
        @update="update('passengers', $event)"
      />
      <BField v-if="removable">
        <BButton
          icon-left="trash"
          size="is-medium"
          title="Remove flight"
          @click="remove"
        />
      </BField>
    </BField>
    <hr>
  </div>
  <!--
  <p>
  Have a <a @click="toggleType">flight number</a> instead?
  </p>
  -->
</template>

<script>
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
      required: true
    },
    removable: {
      type: Boolean,
      default: false
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
  methods: {
    update (name, value) {
      const data = { [name]: value }
      this.$store.commit('estimateForm/updateFlight', { id: this.id, data })
    },
    // toggleType () {
    //   const type = this.type === 'number' ? 'locations' : 'number'
    //   this.update({ type })
    // },
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
