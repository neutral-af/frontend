<template>
  <div class="level estimate-actions">
    <div class="level-item estimate-actions-item">
      <RoundedButton
        tag="router-link"
        :to="{ name: 'estimate-add-flight', query: this.$route.query }"
        type="is-dark"
        size="is-large"
        outlined
        inverted
        icon-left="plus"
      >
        Add flight
      </RoundedButton>
    </div>
    <div class="level-item estimate-actions-item">
      or
    </div>
    <div class="level-item estimate-actions-item">
      <RoundedButton
        tag="router-link"
        :to="{ name: 'estimate-checkout', query: this.$route.query }"
        type="is-primary"
        size="is-large"
        inverted
        outlined
        icon-left="credit-card"
        :disabled="!hasEstimate"
      >
        Go to Checkout
      </RoundedButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('estimate', ['hasEstimate'])
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
