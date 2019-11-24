<template>
  <Field
    label="Email"
    label-for="email"
    class="email-field"
    invert
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
