<template>
  <Hero
    class="hero-only"
    v-bind="{ ...$props, ...$attrs }"
    has-footer
    v-on="$listeners"
  >
    <slot />
  </Hero>
</template>

<script>
import Hero from '@/components/organisms/Hero'

export default {
  components: {
    Hero
  }
}
</script>

<style lang="scss" scoped>
.hero-only {
  position: relative;
  overflow: hidden;
}
</style>
