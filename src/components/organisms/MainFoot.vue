<template>
  <footer class="footer main-foot">
    <RouterLink
      :to="{ name: 'home' }"
      class="is-family-secondary is-size-5"
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
.main-foot {
  font-size: $small-font-size;
  display: flex;
  align-items: center;
  justify-content: center;

  > :first-child {
    margin-right: $size-6;
  }

  a {
    color: inherit;
  }

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
