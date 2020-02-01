<template>
  <div class="level actions">
    <div class="level-item actions-item">
      <slot name="left" />
    </div>
    <div class="level-item actions-item">
      or
    </div>
    <div class="level-item actions-item">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions-item:not(:last-child) {
  @include tablet {
    margin-right: 1rem;
  }
}
</style>
