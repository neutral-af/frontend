<template>
  <component
    :is="as"
    type="button"
    class="inline-flex cursor-pointer justify-center items-center text-center whitespace-no-wrap align-center position-relative align-top transition-colors duration-100"
    :class="{
      'hover:bg-white hover:text-teal-500 hover:border-teal-500 focus:bg-white focus:text-teal-500 focus:border-teal-500': !disabled,
      'bg-white text-teal-600 border-teal-500': active,
      border,
      'text-gray-500 cursor-not-allowed': disabled,
      'rounded-full': rounded,
      'text-base md:text-xl py-2 px-5': size === 'base',
      'text-sm md:text-base py-1 px-3': size === 'sm',
      'text-xl md:text-2xl py-3 px-6': size === 'lg',
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Icon
      v-if="iconLeft"
      :icon="iconLeft"
      :size="size !== 'base' ? size : null"
      :class="{ 'mr-2 md:mr-3': !!$slots.default }"
    />
    <span v-if="!!$slots.default">
      <slot />
    </span>
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      :size="size !== 'base' ? size : null"
      :class="{ 'ml-2 md:ml-3': !!$slots.default }"
    />
  </component>
</template>

<script>
const sizes = ['sm', 'base', 'lg']

export default {
  props: {
    as: {
      type: String,
      default: 'button'
    },
    active: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'base'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'base',
      validator: value => sizes.includes(value)
    }
  }
}
</script>
