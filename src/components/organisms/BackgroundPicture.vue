<template>
  <Transition :name="animated ? 'fade-zoom' : ''">
    <img
      v-show="loaded"
      src="../../assets/img/background.jpg"
      class="absolute top-0 left-0 w-full h-full overflow-hidden background-picture-image"
      @load="onLoad"
    >
  </Transition>
</template>

<script>
export default {
  props: {
    animated: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    onLoad () {
      this.loaded = true
    }
  }
}
</script>

<style>
.background-picture-image {
  mix-blend-mode: soft-light;
  object-fit: cover;
  filter: grayscale(.75);
}

.fade-zoom-enter-active, .fade-zoom-leave-active {
  transition: opacity 2.5s ease-in-out, transform 2.5s ease-out, filter 2.5s ease-out;
}

.fade-zoom-enter, .fade-zoom-leave-to {
  opacity: 0;
  transform: scale(1.2);
  filter: grayscale(1);
}
</style>
