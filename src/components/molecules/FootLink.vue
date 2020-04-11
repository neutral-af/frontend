<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="flex items-center px-2 hover:underline focus:underline"
    v-on="$listeners"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      class="mr-1"
    />
    <span>
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'a'
    },
    icon: {
      type: [String, Array],
      default: ''
    }
  }
}
</script>
