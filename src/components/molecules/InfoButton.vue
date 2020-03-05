<template>
  <Button
    size="is-small"
    type="is-dark"
    outlined
    inverted
    class="info"
    title="What is this?"
    v-on="$listeners"
  >
    <span aria-hidden="true">?</span>
  </Button>
</template>

<style lang="scss" scoped>
.info {
  padding: .5em !important;
  height: 1.5em;
}
</style>
