<template>
  <footer
    class="relative text-white bg-primary-700 text-sm text-center flex items-center justify-center px-4 mt-4 sm:text-base main-foot"
    :class="{
      'py-10': !compact,
      'py-4': compact
    }"
  >
    <BackgroundPhoto class="opacity-25" />
    <div class="z-10 sm:flex sm:items-center sm:justify-center ">
      <RouterLink
        :to="{ name: 'home' }"
        class="font-brand block text-2xl mr-4 sm:text-3xl"
      >
        {{ NAME }}
      </RouterLink>
      <nav class="main-foot-nav">
        <RouterLink
          :to="{ name: 'privacy' }"
          class="hover:underline focus:underline"
        >
          Privacy policy
        </RouterLink>
        ·
        <a
          href="https://www.github.com/neutral-af"
          target="_blank"
          rel="noopener"
          class="hover:underline focus:underline"
        >Source code</a>
        ·
        <a
          href="https://simpleanalytics.com/neutral.af"
          target="_blank"
          rel="noopener"
          class="hover:underline focus:underline"
        >Analytics</a>
        ·
        <FeedbackLink class="hover:underline focus:underline" />
      </nav>
    </div>
  </footer>
</template>

<script>
import { mapConstants } from '@/utils'
import BackgroundPhoto from '@/components/organisms/BackgroundPhoto'

export default {
  components: {
    BackgroundPhoto
  },
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>

<style scoped>
.main-foot {
  background: linear-gradient(141deg, theme('colors.green.900'), theme('colors.teal.500') 70%, theme('colors.teal.300'));
}
</style>
