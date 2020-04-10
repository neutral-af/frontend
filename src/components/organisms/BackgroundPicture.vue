<template>
  <div class="absolute top-0 left-0 overflow-hidden">
    <Transition name="fade-zoom">
      <img
        v-show="loaded"
        src="../../assets/img/background.jpg"
        class="background-picture-image"
        @load="onLoad"
      >
    </Transition>
    <SectionCredits
      compact
      class="absolute bottom-0 right-0 p-4"
    >
      <LLink
        href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >
        Joss Woodhead
      </LLink> · <LLink
        href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >
        Unsplash
      </LLink>
    </SectionCredits>
  </div>
</template>

<script>
import SectionCredits from '@/components/molecules/SectionCredits'

export default {
  components: {
    SectionCredits
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
