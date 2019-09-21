<template>
  <BField
    label="Date"
    :label-for="name"
    class="date-field"
  >
    <BDatepicker
      :name="name"
      size="is-medium"
      placeholder="Date"
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
