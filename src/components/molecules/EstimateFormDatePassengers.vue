<template>
  <Field grouped>
    <Field
      label="Date"
      size="is-medium"
      label-for="date"
      class="date"
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
      label-for="passengers"
      class="passengers"
    >
      <BNumberinput
        name="passengers"
        size="is-medium"
        placeholder=""
        min="1"
        max="10"
        controls-position="compact"
        :value="passengers"
        @input="updatePassengers"
      />
    </Field>
  </Field>
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

<style lang="scss">
.date .input {
  width: 8em;
}

.passengers.is-floating-label.is-medium {
  .label {
    left: 50%;
    transform: translateX(-50%)
  }

  input[type="number"] {
    width: 5em;
  }
}
</style>
