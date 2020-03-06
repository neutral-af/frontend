<template>
  <footer class="relative text-white bg-primary-700 text-sm text-center flex items-center justify-center py-10 px-4 mt-4 sm:text-base main-foot">
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
          class="transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
        >
          Privacy policy
        </RouterLink>
        <a
          href="https://www.github.com/neutral-af"
          target="_blank"
          rel="noopener"
          class="transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
        >
          Source code
        </a>
        <a
          href="https://simpleanalytics.com/neutral.af"
          target="_blank"
          rel="noopener"
          class="transition-colors duration-100 hover:text-primary-500 focus:text-primary-500"
        >
          Analytics
        </a>

        <FeedbackLink />
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
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>

<style scoped>
.main-foot {
  background: linear-gradient(141deg, theme('colors.green.900'), theme('colors.teal.500') 70%, theme('colors.teal.300'));

  &-nav {
    a {
      &::after {
        content: '·'
      }

      &:last-child::after {
        content: ''
      }
    }
  }
}
</style>
