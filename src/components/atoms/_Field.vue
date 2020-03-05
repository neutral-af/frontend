<template>
  <BField
    class="custom-field flex-1 sm:flex-1"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </BField>
</template>

<script>
export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    huge: {
      type: Boolean,
      default: null
    },
    invert: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    classes () {
      const classes = []
      if (this.huge) {
        classes.push('custom-field-huge')
      }
      if (this.invert) {
        classes.push('custom-field-invert')
      }
      return classes
    }
  },
  mounted () {
    if (this.autofocus) {
      const input = this.$el.querySelector('input,select,textarea,button')
      if (input) {
        input.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-field {
  flex-basis: 100%;

  .dropdown.is-inline {
    display: flex !important;
    justify-content: center;
  }

  &.is-grouped {
    .field:last-child {
      margin-bottom: 0.75rem;
    }
  }

  &-invert {
    .input,
    .select select {
      background: none;
      // color: rgba($white, .85);
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 0;
      box-shadow: none;
      padding: 0;

      &:focus {
        box-shadow: none;
        // color: rgba($white, 1);
      }

      &::placeholder {
        // color: rgba($white, .33);
      }
    }

    .select:not(.is-multiple):not(.is-loading) {
      &::after {
        // border-color: rgba($white, .85);
      }

      &:hover,
      &:focus {
        &::after {
          // border-color: rgba($white, .66);
        }
      }
    }

    .label {
      // color: rgba($white, .66);
    }

    .autocomplete {
      .dropdown {
        &-menu {
          padding-top: 0;
        }

        &-content {
          padding-top: 0;
          padding-bottom: 0;
        }

        &-item {
          // color: rgba($white, .5);
          padding-top: 0;
          padding-bottom: 0;
          line-height: 2;

          &:hover,
          &:focus,
          &.is-hovered {
            background: none;
            color: inherit;
          }
        }
      }
    }

    .control {
      .button {
        &,
        &[disabled] {
          background-color: transparent;
        }
      }
    }

    .checkbox,
    .radio {
      &:hover,
      &:focus {
        // color: rgba($white, .85);
      }
    }

    .field.has-addons .control:last-child:not(:only-child) .button {
      border: 0;
      color: inherit;
    }

    .dropdown-content {
      // background-color: saturate(darken($dark, 10%), 12%);
      box-shadow: none;
    }

    .datepicker .datepicker-header {
      border-bottom: 0;
    }

    .datepicker .datepicker-table .datepicker-body .datepicker-cell {
      &.is-selectable {
        // color: $white;
      }

      &.is-unselectable {
        // color: rgba($white, .5);
      }
    }

    .pagination {
      &-previous,
      &-next {
        border: 0;

        .icon {
          // color: rgba($white, .85) !important;
        }

        &:hover,
        &:focus {
          box-shadow: none;

          .icon {
            // color: rgba($white, .66) !important;
          }
        }
      }
    }
  }

  &-huge {
    .input {
      font-size: 4rem;
      height: 1.5em;
      line-height: 1;
      // font-weight: $weight-bold;
      border-bottom-width: 2px;
    }

    .label {
      // font-size: $size-5;
    }

    .autocomplete {
      .dropdown-item {
        // font-size: $size-4;
      }
    }

    .control {
      display: flex;
      align-items: center;

      &.is-loading::after {
        width: 2em;
        height: 2em;
        right: 0;
        top: auto;
        bottom: 2em;
      }

      .button {
        height: 100%;
      }
    }
  }

  .has-addons-centered,
  .is-grouped-centered {
    .control {
      text-align: inherit;
    }
  }
}
</style>
