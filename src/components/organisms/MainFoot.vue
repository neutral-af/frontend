<template>
  <div class="container main-foot">
    <RouterLink
      :to="{ name: 'home' }"
      class="is-family-secondary is-size-5"
    >
      Neutral (as f**k)
    </RouterLink>
    &nbsp;
    <RouterLink :to="{ name: 'privacy' }">
      Privacy policy
    </RouterLink>
    ·
    <a
      href="https://www.github.com/neutral-af"
      target="_blank"
      rel="noopener"
    >
      Source code
    </a>
  </div>
</template>

<style lang="scss" scoped>
.main-foot {
  font-size: 0.875rem;

  a,
  strong {
    color: inherit;
  }
}
</style>
