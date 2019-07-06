<template>
  <fieldset class="field">
    <Field
      label="Flight number"
      size="is-medium"
      label-for="number"
    >
      <input
        name="number"
        type="text"
        class="input is-medium"
        placeholder="e.g. AC895"
        :value="flight.number"
        @input="updateNumber"
      >
    </Field>
    <Field
      label="Date"
      size="is-medium"
      label-for="date"
    >
      <input
        name="date"
        type="text"
        class="input is-medium"
        placeholder="Date"
        :value="displayDate"
        @input="updateDate"
      >
    </Field>
  </fieldset>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    flight () {
      return this.$store.getters['estimateForm/getFlight'](this.id)
    },
    displayDate () {
      return this.flight.date.toISODate()
    }
  },
  methods: {
    updateFlight (data) {
      this.$store.commit('estimateForm/updateFlight', {
        id: this.id,
        data
      })
    },
    updateNumber ({ target: { value } }) {
      this.updateFlight({ number: value })
    },
    updateDate ({ target: { value } }) {
      this.updateFlight({ date: DateTime.fromISO(value) })
    }
  }
}
</script>
