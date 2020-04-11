<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="text-lg py-4 px-2 transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
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
