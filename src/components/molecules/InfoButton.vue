<template>
  <RoundedButton
    size="is-small"
    type="is-dark"
    rounded
    outlined
    inverted
    class="info"
    title="What is this?"
    v-on="$listeners"
  >
    <span aria-hidden="true">?</span>
  </RoundedButton>
</template>

<style lang="scss" scoped>
.info {
  padding: .5em !important;
  height: 1.5em;

  &-text {
    @extend %sr-only;
  }
}
</style>
