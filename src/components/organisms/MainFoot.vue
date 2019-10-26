<template>
  <div class="container main-foot">
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
    <a
      :href="`mailto:${email}`"
      rel="noopener"
      class="main-foot-link"
    >
      Feedback
    </a>
  </div>
</template>

<script>
import { FEEDBACK_EMAIL } from '@/constants'

export default {
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
