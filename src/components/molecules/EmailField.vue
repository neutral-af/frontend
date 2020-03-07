<template>
  <Field
    id="email"
    label="Email"
    :label-icon-left="['far', 'envelope']"
  >
    <Input
      id="email"
      type="email"
      name="email"
      :value="value"
      placeholder="Your Email Address"
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
