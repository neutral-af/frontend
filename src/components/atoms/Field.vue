<template>
  <b-field
    v-bind="$attrs"
    :class="[size]"
    v-on="$listeners"
  >
    <slot />
  </b-field>
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
  &.is-floating-label {
    .label {
      padding-left: 0.25em;
      padding-right: 0.25em;
    }

    &.is-medium {

      &:not(:last-child) {
        margin-bottom: $size-4;
      }

      .label {
        font-size: calc(#{$size-normal} * 7 / 8);
      }
    }
  }
}
</style>
