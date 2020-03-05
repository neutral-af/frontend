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
    v-bind="$attrs"
    v-on="$listeners"
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
    }
  }
}
</script>
