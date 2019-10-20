<template>
  <HeroSection as="main">
    <h1 class="title is-1">
      {{ title }}
    </h1>
    <p class="subtitle is-4">
      You just offset <strong>{{ carbon }}</strong> kilograms of carbon!
    </p>
  </HeroSection>
</template>

<script>
import { mapState } from 'vuex'

import HeroSection from '@/components/organisms/HeroSection'

export default {
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    HeroSection
  },
  computed: {
    ...mapState('estimate', ['carbon']),
    title () {
      return 'Success!'
    }
  }
}
</script>
