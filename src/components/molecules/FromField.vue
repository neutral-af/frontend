<template>
  <BField
    label="Departure airport"
    size="is-medium"
    label-for="from"
  >
    <BInput
      name="from"
      size="is-medium"
      placeholder="e.g. Milan, Malpensa or MXP"
      :value="from"
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      required: true
    }
  }
}
</script>
