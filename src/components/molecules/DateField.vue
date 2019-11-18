<template>
  <CustomField
    label="Date"
    :label-for="id"
    class="date-field"
  >
    <BDatepicker
      :id="id"
      size="is-medium"
      placeholder="Date"
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
      type: Date,
      required: true
    }
  }
}
</script>

<style lang="scss">
.date-field .input {
  width: 8em;
}
</style>
