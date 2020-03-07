<template>
  <component
    :is="as"
    class="tracking-tight leading-tight font-hairline"
    :class="{
      'text-xl md:text-2xl lg:text-3xl mb-4 md:mb-5 lg:mb-6': size === 'sm',
      'text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-5 lg:mb-6': size === 'base',
      'text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-5 lg:mb-6': size === 'lg',
    }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'div'
    },
    size: {
      type: String,
      default: 'base'
    }
  }
}
</script>
