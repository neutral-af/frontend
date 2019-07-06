<template>
  <fieldset class="field">
    <Field
      label="Flight number"
      size="is-medium"
      label-for="number"
    >
      <BInput
        name="number"
        size="is-medium"
        placeholder="e.g. AC895"
        :value="number"
        @input="update"
      />
    </Field>
  </fieldset>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      required: true
    }
  },
  methods: {
    update (value) {
      this.$emit('update', value)
    }
  }
}
</script>
