<template>
  <label
    :class="{
      'cursor-not-allowed': disabled,
      'text-gray-500': disabled || readonly,
      'cursor-pointer': !disabled && !readonly,
      'text-base md:text-xl py-4': size === 'base',
      'text-sm md:text-base py-2': size === 'sm',
      'text-xl md:text-2xl py-6': size === 'lg',
    }"
  >
    <Icon
      :icon="checked ? ['fas', 'check-circle'] : ['far', 'circle']"
      size="lg"
      class="mr-1"
    />
    <input
      type="checkbox"
      class="sr-only"
      :disabled="disabled"
      :readonly="readonly"
      :checked="checked"
      v-bind="$attrs"
      v-on="listeners"
      @change="$emit('change', $event.target.checked)"
    >
    <slot class="ml-2" />
  </label>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'base'
    }
  },
  computed: {
    listeners () {
      const { change, ...listeners } = this.$listeners
      return listeners
    }
  }
}
</script>
