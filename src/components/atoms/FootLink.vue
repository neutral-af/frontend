<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="hover:underline focus:underline"
    v-on="$listeners"
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
