<template>
  <component
    :is="as"
    class="hero is-primary is-fullheight wrapper"
  >
    <div class="background" />
    <div class="hero-body">
      <slot />
    </div>
    <div class="bottom">
      <slot name="bottom" />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'div'
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
  background: url(../../assets/img/background.jpg) no-repeat bottom center / cover,
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
