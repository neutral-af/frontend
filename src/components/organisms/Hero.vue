<template>
  <component
    :is="as"
    class="hero is-primary is-fullheight wrapper"
  >
    <div class="background" />
    <header class="hero-head">
      <MainNav />
    </header>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column has-text-centered view">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <footer
      v-if="hasFooter"
      class="hero-foot"
    >
      <MainFoot />
    </footer>
    <div class="bottom">
      <slot name="bottom" />
    </div>
  </component>
</template>

<script>
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  components: {
    MainNav,
    MainFoot
  },
  props: {
    as: {
      type: String,
      default: 'div'
    },
    hasFooter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}

.background {
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

.view {
  max-width: 800px;
}

.bottom {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  bottom: 0
}
</style>
