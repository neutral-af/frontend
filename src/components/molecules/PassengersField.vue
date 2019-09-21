<template>
  <BField
    label="Passengers"
    position="is-centered"
    :label-for="name"
    class="passengers-field"
  >
    <BNumberinput
      :name="name"
      size="is-medium"
      placeholder=""
      min="1"
      max="10"
      controls-position="compact"
      :value="value"
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
.passengers-field input[type="number"] {
  width: 5em;
}
</style>
