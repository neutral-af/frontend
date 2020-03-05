<template>
  <Actions>
    <Button
      slot="left"
      tag="router-link"
      :to="{ name: 'add-flight', query: this.$route.query }"
      type="is-dark"
      size="is-large"
      outlined
      inverted
      icon-left="plus"
    >
      Add flight
    </Button>
    <Button
      slot="right"
      tag="router-link"
      :to="{ name: 'checkout', query: this.$route.query }"
      type="is-primary"
      size="is-large"
      inverted
      outlined
      icon-left="credit-card"
      :disabled="!hasEstimate"
    >
      Go to Checkout
    </Button>
  </Actions>
</template>

<script>
import { mapGetters } from 'vuex'

import Actions from '@/components/atoms/Actions'

export default {
  components: {
    Actions
  },
  computed: mapGetters('estimate', ['hasEstimate'])
}
</script>
