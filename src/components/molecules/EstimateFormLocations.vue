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
        :value="from"
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
        :value="to"
        @input="updateTo"
      />
    </Field>
  </fieldset>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    updateFrom ({ target: { value } }) {
      this.$emit('updateFrom', value)
    },
    updateTo ({ target: { value } }) {
      this.$emit('updateTo', value)
    }
  }
}
</script>
