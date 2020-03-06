<template>
  <input
    type="text"
    class="border-b leading-loose hover:border-teal-500 focus:border-teal-500"
    :class="{
      'cursor-not-allowed': disabled,
      'bg-white text-gray-500': disabled || readonly,
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
