<template>
  <div class="relative">
    <select
      class="appearance-none border-b leading-loose hover:border-teal-500 focus:border-teal-500"
      :class="{
        'cursor-pointer': !disabled,
        'text-base md:text-xl py-2 pr-5': size === 'base',
        'text-sm md:text-base py-1 pr-3': size === 'sm',
        'cursor-not-allowed': disabled,
        'text-gray-500': disabled || readonly,
      }"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="$emit('change', $event.target.value)"
    >
      <slot />
    </select>
    <Icon
      icon="angle-down"
      :size="size"
      class="absolute right-0 pointer-events-none"
      style="top: 50%; transform: translateY(-50%)"
    />
  </div>
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
    size: {
      type: String,
      default: 'base'
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
