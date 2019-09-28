<template>
  <BField
    label="Cardholder Name"
    label-for="name"
  >
    <BInput
      name="name"
      size="is-medium"
      placeholder="Your Cardholder Name"
      :value="value"
      required
      @input="$emit('update', $event)"
    />
  </BField>
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
