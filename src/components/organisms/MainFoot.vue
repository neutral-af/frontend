<template>
  <footer class="text-white bg-teal-700 text-xs text-center p-4 mt-4 sm:flex sm:items-center sm:justify-center">
    <RouterLink
      :to="{ name: 'home' }"
      class="font-brand block text-xl mr-4"
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
