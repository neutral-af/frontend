<template>
  <BField
    label="Passengers"
    size="is-medium"
    label-for="passengers"
    class="passengers"
  >
    <BNumberinput
      name="passengers"
      size="is-medium"
      placeholder=""
      min="1"
      max="10"
      controls-position="compact"
      :value="passengers"
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    passengers: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.passengers input[type="number"] {
  width: 5em;
}
</style>
