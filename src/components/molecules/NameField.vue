<template>
  <Field
    id="name"
    label="Cardholder Name"
    class="name-field"
  >
    <Input
      id="name"
      name="name"
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
