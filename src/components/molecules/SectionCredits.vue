<template>
  <div
    class="text-xs flex items-center"
  >
    <Icon
      icon="info-circle"
      size="sm"
      class="mr-2"
    />
    <div :class="{ 'hidden sm:inline': compact }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  }
}
</script>
