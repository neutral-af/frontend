<template>
  <article class="card estimate-form-flight">
    <header class="card-header">
      <div class="card-header-title">
        Flight {{ id }}
      </div>
      <a
        v-if="removeable"
        class="card-header-icon"
        @click="remove"
      >
        <BIcon icon="trash" />
      </a>
    </header>
    <div class="card-content">
      <template v-if="flight.type === 'number'">
        <EstimateFormNumber
          :number="flight.number"
          @update="updateNumber"
        />
        <p class="field">
          Missing flight number? Insert
          <a @click="toggleType">
            airports
          </a>
          instead
        </p>
      </template>
      <template v-else>
        <EstimateFormLocations
          :from="flight.from"
          :to="flight.to"
          @updateFrom="updateFrom"
          @updateTo="updateTo"
        />
        <p class="field">
          Have a
          <a @click="toggleType">
            flight number
          </a>
          instead?
        </p>
      </template>
    </div>
    <div class="card-content">
      <EstimateFormDatePassengers
        :date="flight.date"
        :passengers="flight.passengers"
        @updateDate="updateDate"
        @updatePassengers="updatePassengers"
      />
    </div>
  </article>
</template>

<script>
import EstimateFormNumber from '~/components/molecules/EstimateFormNumber'
import EstimateFormLocations from '~/components/molecules/EstimateFormLocations'
import EstimateFormDatePassengers from '~/components/molecules/EstimateFormDatePassengers'

export default {
  components: {
    EstimateFormNumber,
    EstimateFormLocations,
    EstimateFormDatePassengers
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
.estimate-form-flight {
  min-height: $estimate-form-flight-min-height;
}

.card-content:not(:first-child) {
  border-top: $card-content-border-top;
}
</style>
