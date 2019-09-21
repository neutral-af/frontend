<template>
  <BField
    label="Flight number"
    :label-for="name"
  >
    <BInput
      :name="name"
      size="is-medium"
      placeholder="e.g. AC895"
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
      type: String,
      required: true
    }
  }
}
</script>
