<template>
  <component
    :is="as"
    type="button"
    class="inline-flex cursor-pointer border rounded-full justify-center text-center whitespace-no-wrap align-center position-relative align-top text-xl py-2 px-4 hover:bg-white hover:text-teal-700"
    :class="{
      'text-xl md:text-2xl': size === 'lg',
      'py-3 px-6': size === 'lg',
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Icon
      v-if="iconLeft"
      :icon="iconLeft"
    />
    <span>
      <slot />
    </span>
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      class="ml-2"
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
    color: {
      type: String,
      default: 'base'
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'base',
      validator: value => sizes.includes(value)
    }
  }
}
</script>
