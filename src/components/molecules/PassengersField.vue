<template>
  <Field
    label="Passengers"
    position="is-centered"
    :label-for="id"
    invert
    huge
    class="passengers-field"
  >
    <BNumberinput
      :id="id"
      :value="value"
      min="1"
      max="8"
      required
      @input="$emit('update', $event)"
    />
  </Field>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.passengers-field {
  input[type="number"] {
    width: 2em;
  }
}
</style>
