<template>
  <BField
    label="Passengers"
    position="is-centered"
    :label-for="name"
    class="field-invert field-huge passengers-field"
  >
    <BNumberinput
      :name="name"
      :value="value"
      min="1"
      max="8"
      required
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    name: {
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
// .passengers-field .select {
//   select:not([multiple]) {
//     padding-right: 1.5em;
//   }

//   &:not(.is-multiple):not(.is-loading)::after {
//     right: 1em;
//   }
// }
</style>
