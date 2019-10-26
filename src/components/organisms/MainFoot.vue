<template>
  <footer class="footer main-foot">
    <div class="container">
      <RouterLink
        :to="{ name: 'home' }"
        class="is-family-secondary is-size-5"
      >
        Neutral (as f**k)
      </RouterLink>
      &nbsp;
      <RouterLink
        :to="{ name: 'privacy' }"
        class="main-foot-link"
      >
        Privacy policy
      </RouterLink>
      <a
        href="https://www.github.com/neutral-af"
        target="_blank"
        rel="noopener"
        class="main-foot-link"
      >
        Source code
      </a>
      <FeedbackLink />
    </div>
  </footer>
</template>

<script>
import { FEEDBACK_EMAIL } from '@/constants'
import FeedbackLink from '@/components/atoms/FeedbackLink'

export default {
  components: {
    FeedbackLink
  },
  computed: {
    email () {
      return FEEDBACK_EMAIL
    }
  }
}
</script>

<style lang="scss" scoped>
.main-foot {
  font-size: $small-font-size;

  a {
    color: inherit;
  }

  &-link {
    &::after {
      content: '·'
    }

    &:last-child::after {
      content: ''
    }
  }
}
</style>
