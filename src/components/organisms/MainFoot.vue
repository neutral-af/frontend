<template>
  <footer class="footer container has-text-centered main-foot">
    <p class="is-small">
      <RouterLink :to="{ name: 'estimate' }">
        <strong>Carbon Offset</strong>
      </RouterLink> ·
      Photo: <a
        href="https://unsplash.com/@josswoodhead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >Joss Woodhead</a> → <a
        href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        noreferrer
        target="_blank"
      >Unsplash</a>
    </p>
  </footer>
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
