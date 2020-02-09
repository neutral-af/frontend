<template>
  <div class="has-text-centered">
    <div class="title is-size-1">
      {{ title }}
    </div>
    <p class="subtitle is-size-6-mobile is-size-5-tablet is-size-4-desktop">
      Congratulations! You just offset <strong>{{ carbon }}</strong> kilograms of carbon!
    </p>
    <RoundedButton
      tag="router-link"
      size="is-large"
      type="is-primary"
      inverted
      outlined
      icon-right="arrow-right"
      :to="{ name: 'estimate-home' }"
    >
      Offset more flights
    </RoundedButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { trackEvent } from '@/tracking'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapState('estimate', ['carbon']),
    title () {
      return 'Success!'
    }
  },
  created () {
    trackEvent('successPage', {})
  },
  beforeDestroy () {
    this.$store.commit('estimate/reset')
  }
}
</script>
