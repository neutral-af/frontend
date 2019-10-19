<template>
  <BButton
    size="is-small"
    type="is-dark"
    rounded
    outlined
    inverted
    class="info"
    v-on="$listeners"
  >
    <span class="info-text">What is this</span>?
  </BButton>
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
