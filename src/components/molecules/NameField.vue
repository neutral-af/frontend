<template>
  <Field
    label="Cardholder Name"
    label-for="name"
    class="name-field"
    invert
  >
    <BInput
      name="name"
      size="is-medium"
      placeholder="Your Cardholder Name"
      :value="value"
      required
      @input="$emit('update', $event)"
    />
  </Field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
