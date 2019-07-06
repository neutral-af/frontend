<template>
  <fieldset class="field">
    <Field
      label="Date"
      size="is-medium"
      label-for="date"
    >
      <BInput
        name="date"
        size="is-medium"
        placeholder="Date"
        :value="displayDate"
        @input="updateDate"
      />
    </Field>
    <Field
      label="Passengers"
      size="is-medium"
      :label-position="null"
      label-for="passengers"
    >
      <BNumberinput
        name="passengers"
        size="is-medium"
        placeholder=""
        min="1"
        max="10"
        :value="passengers"
        @input="updatePassengers"
      />
    </Field>
  </fieldset>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    passengers: {
      type: Number,
      required: true
    },
    date: {
      type: DateTime,
      required: true
    }
  },
  data () {
    return {
      displayDate: this.date.toISODate()
    }
  },
  methods: {
    updateDate (value) {
      this.$emit('updateDate', DateTime.fromISO(value))
    },
    updatePassengers (value) {
      this.$emit('updatePassengers', value)
    }
  }
}
</script>
