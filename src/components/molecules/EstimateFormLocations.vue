<template>
  <fieldset class="field">
    <Field
      label="Departure airport"
      size="is-medium"
      label-for="from"
    >
      <BInput
        name="from"
        size="is-medium"
        placeholder="e.g. Milan, Malpensa or MXP"
        :value="flight.from"
        @input="updateFrom"
      />
    </Field>
    <Field
      label="Arrival airport"
      size="is-medium"
      label-for="to"
    >
      <BInput
        name="to"
        size="is-medium"
        placeholder="e.g. Toronto, Pearson or YYZ"
        :value="flight.to"
        @input="updateTo"
      />
    </Field>
  </fieldset>
</template>

<script>
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
    }
  },
  methods: {
    updateFlight (data) {
      this.$store.commit('estimateForm/updateFlight', {
        id: this.id,
        data
      })
    },
    updateFrom ({ target: { value } }) {
      this.updateFlight({ from: value })
    },
    updateTo ({ target: { value } }) {
      this.updateFlight({ to: value })
    }
  }
}
</script>
