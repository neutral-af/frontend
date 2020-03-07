<template>
  <div
    class="text-xs py-2 px-4 flex items-center sm:py-2"
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
