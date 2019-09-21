<template>
  <BField
    label="Passengers"
    position="is-centered"
    :label-for="name"
    class="passengers-field"
  >
    <BSelect
      :name="name"
      size="is-medium"
      :value="value"
      required
      @input="$emit('update', $event)"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </BSelect>
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
      type: Number,
      required: true
    }
  },
  computed: {
    options () {
      return Array.from(Array(9), (value, index) => index)
    }
  }
}
</script>

<style lang="scss">
.passengers-field .select {
  select:not([multiple]) {
    padding-right: 1.5em;
  }

  &:not(.is-multiple):not(.is-loading)::after {
    right: 1em;
  }
}
</style>
