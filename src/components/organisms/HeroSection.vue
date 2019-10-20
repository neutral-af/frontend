<template>
  <component
    :is="as"
    class="hero is-fullheight hero-section"
  >
    <div
      v-if="background"
      class="hero-section-background"
    />
    <header
      v-if="$slots.head"
      class="hero-head"
    >
      <slot name="head" />
    </header>
    <div class="hero-body">
      <div class="container">
        <slot />
      </div>
    </div>
    <footer
      v-if="$slots.foot"
      class="has-text-centered hero-foot hero-section-foot"
    >
      <slot name="foot" />
    </footer>
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'div'
    },
    background: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  overflow: hidden;

  &-background {
    position: absolute;
    left: 0;
    bottom: -10vh;
    width: 100%;
    height: 100%;
    mix-blend-mode: soft-light;
    filter: grayscale(50);
    z-index: 0;
    background: url(../../assets/background.jpg) no-repeat bottom center / cover,
  }

  &-foot {
    padding-bottom: 1.5rem;
  }
}
</style>
