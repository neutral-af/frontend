<template>
  <component
    :is="as"
    class="text-2xl tracking-tight leading-tight mb-4 md:text-3xl md:mb-5 lg:text-4xl lg:mb-6"
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
    }
  }
}
</script>
