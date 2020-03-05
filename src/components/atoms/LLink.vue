<template>
  <component
    :is="as"
    class="underline hover:no-underline focus:no-underline"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'a'
    }
  }
}
</script>
