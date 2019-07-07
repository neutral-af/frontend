<template>
  <fieldset class="field">
    <Field
      label="Flight number"
      size="is-medium"
      label-for="number"
      type="{ is-danger: errors.has('number') }"
      :message="errors.first('number')"
    >
      <BInput
        v-validate="'required'"
        name="number"
        size="is-medium"
        placeholder="e.g. AC895"
        :value="number"
        @input="update"
      />
    </Field>
  </fieldset>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      required: true
    }
  },
  methods: {
    update (value) {
      this.$emit('update', value)
    }
  }
}
</script>
