<template>
  <div class="estimate-actions">
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
    <br>
    <br>
    or
    <br>
    <br>
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
