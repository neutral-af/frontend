<template>
  <div class="container main-foot">
    <p class="is-small">
      <RouterLink
        :to="{ name: 'home' }"
        class="is-family-secondary is-size-5"
      >
        Neutral (as f**k)
      </RouterLink>
      <span class="is-block-mobile-small">
        <span class="is-hidden-mobile-small">·</span>
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.main-foot {
  font-size: 0.9rem;

  a,
  strong {
    color: inherit;
  }

  a {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}
</style>
