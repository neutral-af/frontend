<template>
  <div class="estimate-actions">
    <BButton
      type="is-dark"
      size="is-large"
      outlined
      inverted
      icon-left="plus"
      @click="$emit('add')"
    >
      Add flight
    </BButton>
    <br>
    <br>
    or
    <br>
    <br>
    <BButton
      type="is-primary"
      size="is-large"
      inverted
      outlined
      icon-left="credit-card"
      :disabled="!hasEstimate"
      @click="$emit('next')"
    >
      Go to Checkout
    </BButton>
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
