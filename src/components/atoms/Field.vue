<template>
  <BField
    v-bind="$attrs"
    :class="[size]"
    v-on="$listeners"
  >
    <slot />
  </BField>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.field {
  &:not(.is-grouped) {
    > .field.is-floating-label.is-medium:not(:last-child) {
      margin-bottom: $size-4;
    }
  }

  > .field.is-floating-label {
    .label {
      padding-left: 0.25em;
      padding-right: 0.25em;
    }

    &.is-medium {
      .label {
        font-size: calc(#{$size-normal} * 7 / 8);
      }
    }
  }
}
</style>
