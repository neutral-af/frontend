<template>
  <div class="container main-foot">
    <RouterLink
      :to="{ name: 'home' }"
      class="is-family-secondary is-size-5"
    >
      {{ name }}
    </RouterLink>
    &nbsp;
    <RouterLink :to="{ name: 'privacy' }">
      Privacy policy
    </RouterLink>
    {{ separator }}
    <a
      href="https://www.github.com/neutral-af"
      target="_blank"
      rel="noopener"
    >
      Source code
    </a>
  </div>
</template>

<script>
import { NAME, SEPARATOR } from '@/constants'

export default {
  computed: {
    name () {
      return NAME
    },
    separator () {
      return SEPARATOR
    }
  }
}
</script>

<style lang="scss" scoped>
.main-foot {
  font-size: 0.875rem;

  a,
  strong {
    color: inherit;
  }
}
</style>
