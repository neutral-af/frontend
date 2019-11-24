<template>
  <CustomField
    label="Flight number"
    :label-for="id"
  >
    <BInput
      :id="id"
      size="is-medium"
      placeholder="e.g. AC895"
      :value="value"
      required
      @input="$emit('update', $event)"
    />
  </CustomField>
</template>

<script>
export default {
  props: {
    id: {
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
