<template>
  <BField
    label="Date"
    size="is-medium"
    label-for="date"
    class="date"
  >
    <BDatepicker
      name="date"
      size="is-medium"
      placeholder="Date"
      :value="date"
      @input="$emit('update', $event)"
    />
  </BField>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      required: true
    }
  }
}
</script>

<style lang="scss">
.date .input {
  width: 8em;
}
</style>
