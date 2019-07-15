<template>
  <section class="estimate-form-flight">
    <BField
      grouped
      position="is-centered"
    >
      <DateField
        :date="flight.date"
        @update="updateDate"
      />
      <PassengersField
        :passengers="flight.passengers"
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
    <template v-if="flight.type === 'number'">
      <NumberField
        :number="flight.number"
        @update="updateNumber"
      />
      <p class="field">
        Missing flight number? Insert <a @click="toggleType">airports</a> instead
      </p>
    </template>
    <template
      v-else
    >
      <BField grouped>
        <FromField
          :from="flight.from"
          @update="updateFrom"
        />
        <ToField
          :to="flight.to"
          @updateTo="updateTo"
        />
      </BField>
      <p class="field">
        Have a <a @click="toggleType">flight number</a> instead?
      </p>
    </template>
  </section>
</template>

<script>
import DateField from '@/components/molecules/DateField'
import FromField from '@/components/molecules/FromField'
import NumberField from '@/components/molecules/NumberField'
import PassengersField from '@/components/molecules/PassengersField'
import ToField from '@/components/molecules/ToField'

export default {
  components: {
    DateField,
    FromField,
    NumberField,
    PassengersField,
    ToField
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
