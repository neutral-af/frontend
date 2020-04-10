<template>
  <div class="relative overflow-hidden min-h-screen text-white bg-primary-600 flex flex-col justify-between items-center hero">
    <BackgroundPicture class="w-screen h-screen" />
    <MainHead
      class="z-10"
      :sticky="mainHeadSticky"
      :class="{ 'text-gray-700 bg-white': mainHeadSticky }"
    />
    <div
      class="container text-center z-10"
      style="margin-top: -30vh"
    >
      <p class="font-brand text-4xl leading-tight mb-4 md:text-5xl lg:text-6xl">
        <span class="block sm:inline text-6xl md:text-7xl lg:text-8xl">
          <vue-typer
            :text="['Go', 'Fly','Drive']"
            erase-style="backspace"
            :pre-erase-delay="2500"
            :type-delay="150"
          />
          Neutral
        </span>
        (as f**k)
      </p>
      <Button
        as="RouterLink"
        size="xl"
        color="invert"
        icon-right="arrow-right"
        :to="{ name: 'flights' }"
      >
        Offset a flight now
      </Button>
    </div>
    <div class="mb-4 z-10">
      <ScrollButton
        title="Know more"
        color="invert"
        to="#badnews"
      />
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

import BackgroundPicture from '@/components/organisms/BackgroundPicture'
import MainHead from '@/components/organisms/MainHead'

export default {
  components: {
    BackgroundPicture,
    MainHead,
    VueTyper
  },
  data () {
    return {
      mainHeadSticky: false
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(([{ isIntersecting }]) => {
      this.mainHeadSticky = !isIntersecting
    })
    this.observer.observe(this.$el)
  },
  beforeDestroy () {
    this.observer.disconnect()
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(141deg, theme('colors.green.900'), theme('colors.teal.500') 70%, theme('colors.teal.300'));
}
</style>

<style>
.vue-typer {
  color: inherit;
}

.vue-typer .custom.char.typed {
  color: inherit;
}

.vue-typer .custom.caret {
  display: none;
}
</style>
