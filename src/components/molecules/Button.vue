<template>
  <component
    :is="as"
    :type="type || (as === 'button' ? 'button' : undefined)"
    class="inline-flex justify-center items-center text-center whitespace-no-wrap align-center position-relative align-top transition-colors duration-100"
    :class="{
      border,
      'cursor-pointer': !disabled && !loading,
      'text-gray-500 cursor-not-allowed pointer-events-none': disabled,
      'cursor-default pointer-events-none': loading,
      'rounded-full': rounded,
      'text-sm md:text-base px-2': size === 'xs',
      'text-xs md:text-sm py-1 px-3': size === 'sm',
      'text-base md:text-xl py-2 px-5': size === 'base',
      'text-xl md:text-2xl py-3 px-6': size === 'lg',
      'text-primary-500 bg-white border-white': variant === 'solid',
      'hover:text-primary-600 hover:bg-gray-200 hover:border-white focus:text-primary-600 focus:bg-gray-200 focus:border-white': variant === 'solid' && !disabled && !loading,
      '': variant === 'outline',
      'hover:bg-white hover:text-primary-500 hover:border-primary-500 focus:bg-white focus:text-primary-600 focus:border-primary-600': variant === 'outline' && !disabled && !loading,
      'text-primary-600 bg-white border-primary-600': variant === 'outline' && active,
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Icon
      v-if="iconLeft"
      :icon="iconLeft"
      :size="size"
      :class="{
        'mr-2 md:mr-3': !!$slots.default,
        invisible: loading,
      }"
    />
    <span
      v-if="!!$slots.default"
      :class="{ invisible: loading }"
    >
      <slot />
    </span>
    <LoadingIcon
      v-if="loading"
      class="absolute"
    />
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      :size="size"
      :class="{
        'ml-2 md:ml-3': !!$slots.default,
        invisible: loading,
      }"
    />
  </component>
</template>

<script>
const sizes = ['xs', 'sm', 'base', 'lg']

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
    loading: {
      type: Boolean,
      default: false
    },
    important: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: [String, Array],
      default: ''
    },
    iconRight: {
      type: [String, Array],
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
    },
    type: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: 'outline'
    }
  }
}
</script>
