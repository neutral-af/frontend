<template>
  <div
    class="is-size-7 section-credits"
    :class="`section-credits-${side}`"
  >
    <BIcon
      icon="info-circle"
      size="is-small"
      class="section-credits-icon"
    />
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    side: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-credits {
  position: absolute;
  bottom: 1.25rem;
  display: flex;
  align-items: center;

  &-left {
    left: 1rem;
  }

  &-right {
    right: 1rem;
  }

  &-icon {
    margin-right: .25rem;
  }

  a {
    color: inherit;
    text-decoration: underline;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
}
</style>
