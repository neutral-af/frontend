<template>
  <Field
    grouped
    class="date-passengers-fields"
  >
    <Field
      label="Date"
      size="is-medium"
      label-for="date"
      class="date"
      type="{ is-danger: errors.has('date') }"
      :message="errors.first('date')"
    >
      <BDatepicker
        v-validate="'required'"
        name="date"
        size="is-medium"
        placeholder="Date"
        :value="date"
        @input="updateDate"
      />
    </Field>
    <Field
      label="Passengers"
      size="is-medium"
      label-for="passengers"
      class="passengers"
      type="{ is-danger: errors.has('passengers') }"
      :message="errors.first('passengers')"
    >
      <BNumberinput
        v-validate="'required'"
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
export default {
  props: {
    passengers: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  methods: {
    updateDate (value) {
      this.$emit('updateDate', value)
    },
    updatePassengers (value) {
      this.$emit('updatePassengers', value)
    }
  }
}
</script>

<style lang="scss">
.date-passengers-fields {
  margin-top: $size-4;
}

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
