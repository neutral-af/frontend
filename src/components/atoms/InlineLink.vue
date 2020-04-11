<template>
  <component
    :is="as"
    v-bind="$attrs"
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
