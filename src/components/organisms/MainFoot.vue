<template>
  <div class="footer container has-text-centered main-foot">
    <p class="is-small">
      <RouterLink
        :to="{ name: 'estimate' }"
        class="is-family-secondary is-size-5"
      >
        Neutral (as f**k)
      </RouterLink>
      <span class="is-block-mobile-small">
        <span class="is-hidden-mobile-small">·</span>
        Photo: <a
          href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Joss Woodhead</a> → <a
          href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          noreferrer
          target="_blank"
        >Unsplash</a>
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
