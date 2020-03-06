<template>
  <footer class="text-white bg-primary-700 text-sm text-center py-10 px-4 mt-4 sm:flex sm:items-center sm:justify-center sm:text-base">
    <RouterLink
      :to="{ name: 'home' }"
      class="font-brand block text-2xl mr-4 sm:text-3xl"
    >
      {{ NAME }}
    </RouterLink>
    <nav class="main-foot-nav">
      <RouterLink :to="{ name: 'privacy' }">
        Privacy policy
      </RouterLink>
      <a
        href="https://www.github.com/neutral-af"
        target="_blank"
        rel="noopener"
      >
        Source code
      </a>
      <a
        href="https://simpleanalytics.com/neutral.af"
        target="_blank"
        rel="noopener"
      >
        Analytics
      </a>

      <FeedbackLink />
    </nav>
  </footer>
</template>

<script>
import { mapConstants } from '@/utils'

export default {
  computed: {
    ...mapConstants(['NAME'])
  }
}
</script>

<style lang="scss" scoped>
.main-foot-nav {
  a {
    &::after {
      content: '·'
    }

    &:last-child::after {
      content: ''
    }
  }
}
</style>
