<template>
  <component
    :is="as"
    class="border w-full bg-white"
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
