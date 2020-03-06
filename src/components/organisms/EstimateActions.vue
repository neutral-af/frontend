<template>
  <Actions>
    <Button
      slot="left"
      as="RouterLink"
      :to="{ name: 'add-flight', query: this.$route.query }"
      size="lg"
      icon-left="plus"
    >
      Add flight
    </Button>
    <Button
      slot="right"
      as="RouterLink"
      :to="{ name: 'checkout', query: this.$route.query }"
      size="lg"
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
