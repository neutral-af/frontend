<template>
  <HeroSection as="main">
    <h1 class="title is-1">
      Ouch!
    </h1>
    <p class="subtitle is-4">
      The page was not found.
    </p>
  </HeroSection>
</template>

<script>
import HeroSection from '@/components/organisms/HeroSection'

export default {
  head: {
    title: 'Not found'
  },
  components: {
    HeroSection
  }
}
</script>
