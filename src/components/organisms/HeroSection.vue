<template>
  <component
    :is="as"
    class="hero is-fullheight hero-section"
  >
    <template v-if="background">
      <div class="hero-section-background" />
      <div class="is-size-7 hero-section-credits">
        <BIcon
          icon="info-circle"
          size="is-small"
          class="hero-section-credits-icon"
        />
        <a
          href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Joss Woodhead</a> · <a
          href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Unsplash</a>
      </div>
    </template>
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

  &-credits {
    position: absolute;
    bottom: 1rem;
    left: 1rem;

    &-icon {
      vertical-align: text-bottom;
      margin-right: .25rem;
    }

    a {
      color: inherit;
      text-decoration: underline;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  &-foot {
    padding-bottom: 1.5rem;
  }
}
</style>
