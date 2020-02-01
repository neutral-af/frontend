<template>
  <component
    :is="as"
    class="hero is-fullheight hero-section"
  >
    <template v-if="background">
      <div class="hero-section-background" />
      <SectionCredits>
        <a
          href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Joss Woodhead</a> · <a
          href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Unsplash</a>
      </SectionCredits>
    </template>
    <header
      v-if="$slots.head"
      class="hero-head"
    >
      <slot name="head" />
    </header>
    <div class="hero-body">
      <slot />
    </div>
    <div
      v-if="$slots.foot"
      class="has-text-centered hero-foot hero-section-foot"
    >
      <slot name="foot" />
    </div>
  </component>
</template>

<script>
import SectionCredits from '@/components/molecules/SectionCredits'

export default {
  components: {
    SectionCredits
  },
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
    background: url(../../assets/img/background.jpg) no-repeat bottom center / cover,
  }
}
</style>
