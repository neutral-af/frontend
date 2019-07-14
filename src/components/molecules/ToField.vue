<template>
  <BField
    label="Arrival airport"
    size="is-medium"
    label-for="to"
  >
    <BInput
      name="to"
      size="is-medium"
      placeholder="e.g. Toronto, Pearson or YYZ"
      :value="to"
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
