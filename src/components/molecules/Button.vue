<template>
  <component
    :is="as"
    :type="type || (as === 'button' ? 'button' : undefined)"
    class="inline-flex border justify-center items-center text-center whitespace-no-wrap align-center position-relative align-top transition-colors duration-100"
    :class="{
      //hover:bg-white hover:text-primary-500 hover:border-primary-500 focus:bg-white focus:text-primary-600 focus:border-primary-600
      'cursor-pointer': !disabled,
      'text-gray-500 cursor-not-allowed': disabled,
      'text-primary-500 bg-white border-white': variant === 'solid',
      'hover:text-primary-600 hover:bg-gray-200 hover:border-white focus:text-primary-600 focus:bg-gray-200 focus:border-white': variant === 'solid' && !disabled,
      '': variant === 'outline',
      'hover:bg-white hover:text-primary-500 hover:border-primary-500 focus:bg-white focus:text-primary-600 focus:border-primary-600': variant === 'outline' && !disabled,
      'text-primary-600 bg-white border-primary-600': variant === 'outline' && active,
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
      :size="size"
      :class="{ 'mr-2 md:mr-3': !!$slots.default }"
    />
    <span v-if="!!$slots.default">
      <slot />
    </span>
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      :size="size"
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
    variant: {
      type: String,
      default: 'outline'
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
    },
    type: {
      type: String,
      default: null
    }
  }
}
</script>
