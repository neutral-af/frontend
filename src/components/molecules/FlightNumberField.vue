<template>
  <BField
    label="Flight number"
    size="is-medium"
    label-for="number"
  >
    <BInput
      name="number"
      size="is-medium"
      placeholder="e.g. AC895"
      :value="number"
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      required: true
    }
  }
}
</script>
