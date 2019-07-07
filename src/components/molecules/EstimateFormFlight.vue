<template>
  <article class="estimate-form-flight">
    <a
      v-if="removeable"
      class="card-header-icon"
      @click="remove"
    >
      <BIcon icon="trash" />
    </a>
    <template v-if="flight.type === 'number'">
      <NumberField
        :number="flight.number"
        @update="updateNumber"
      />
      <p class="field">
        Missing flight number? Insert <a @click="toggleType">airports</a> instead
      </p>
    </template>
    <template v-else>
      <LocationsFields
        :from="flight.from"
        :to="flight.to"
        @updateFrom="updateFrom"
        @updateTo="updateTo"
      />
      <p class="field">
        Have a <a @click="toggleType">flight number</a> instead?
      </p>
    </template>
    <DatePassengersFields
      :date="flight.date"
      :passengers="flight.passengers"
      @updateDate="updateDate"
      @updatePassengers="updatePassengers"
    />
  </article>
</template>

<script>
import NumberField from '~/components/molecules/NumberField'
import LocationsFields from '~/components/molecules/LocationsFields'
import DatePassengersFields from '~/components/molecules/DatePassengersFields'

export default {
  components: {
    NumberField,
    LocationsFields,
    DatePassengersFields
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
    toggleType () {
      const type = this.flight.type === 'number' ? 'locations' : 'number'
      this.update({ type })
    },
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

<style lang="scss" scoped>
.card-content:not(:first-child) {
  border-top: $card-content-border-top;
}
</style>
