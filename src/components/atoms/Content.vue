<template>
  <VueMarkdown class="content mb-6">
    <slot />
  </VueMarkdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  }
}
</script>

<style>
.content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.75em;
    font-weight: 300;
    letter-spacing: -0.025em;
    margin-bottom: 0.25em;
    line-height: 1.25;
  }

  p {
    margin-bottom: 1.5em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
}
</style>
