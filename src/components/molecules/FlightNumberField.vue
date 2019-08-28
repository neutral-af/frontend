<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    slim
  >
    <BField
      label="Flight number"
      :label-for="name"
      :type="{ 'is-danger': invalid }"
      :message="errors[0]"
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
      type: String,
      required: true
    }
  }
}
</script>
