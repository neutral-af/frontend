<template>
  <div class="level estimate-actions">
    <div class="level-item estimate-actions-item">
      <RoundedButton
        type="is-dark"
        size="is-large"
        outlined
        inverted
        icon-left="plus"
        @click="$emit('add')"
      >
        Add flight
      </RoundedButton>
    </div>
    <div class="level-item estimate-actions-item">
      or
    </div>
    <div class="level-item estimate-actions-item">
      <RoundedButton
        type="is-primary"
        size="is-large"
        inverted
        outlined
        icon-left="credit-card"
        :disabled="!hasEstimate"
        @click="$emit('next')"
      >
        Go to Checkout
      </RoundedButton>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasEstimate () {
      return this.$store.state.estimate.id
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-actions {
  &-item:not(:last-child) {
    @include tablet {
      margin-right: 1rem;
    }
  }
}
</style>
