<template>
  <div class="container main-foot">
    <RouterLink
      :to="{ name: 'home' }"
      class="is-family-secondary is-size-5"
    >
      Neutral (as f**k)
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.main-foot {
  a,
  strong {
    color: inherit;
  }
}
</style>
