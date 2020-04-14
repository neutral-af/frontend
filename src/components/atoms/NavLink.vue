<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="text-lg p-2 transition-colors duration-100 hover:text-primary-500 focus:text-primary-500 sm:py-4"
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
      default: 'RouterLink'
    }
  }
}
</script>
