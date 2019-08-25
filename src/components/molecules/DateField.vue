<template>
  <ValidationProvider
    v-slot="{ errors }"
    slim
  >
    <BField
      label="Date"
      size="is-medium"
      :label-for="name"
      class="date-field"
      :type="{ 'is-danger': errors[0] }"
      :message="errors[0]"
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
  </ValidationProvider>
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
