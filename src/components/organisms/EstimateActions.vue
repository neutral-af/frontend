<template>
  <div class="has-text-centered">
    <BButton
      type="is-dark"
      size="is-large"
      outlined
      inverted
      icon-left="plus"
      :disabled="!hasEstimate"
      @click="onConfirm"
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
      @click="onConfirm"
    >
      Go to Checkout
    </BButton>
  </div>
</template>
