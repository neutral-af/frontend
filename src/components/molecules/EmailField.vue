<template>
  <BField
    label="Email"
    label-for="email"
    class="email-field"
  >
    <BInput
      name="email"
      size="is-medium"
      placeholder="Your Email Address"
      :value="value"
      type="email"
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
