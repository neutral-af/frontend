<template>
  <input
    type="text"
    class="bg-transparent border-b leading-loose transition-colors duration-100 hover:border-primary-500 focus:border-primary-500"
    :class="{
      'cursor-not-allowed': disabled,
      'text-gray-500': disabled || readonly,
    }"
    :disabled="disabled"
    :readonly="readonly"
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  computed: {
    listeners () {
      const { input, ...listeners } = this.$listeners
      return listeners
    }
  }
}
</script>
