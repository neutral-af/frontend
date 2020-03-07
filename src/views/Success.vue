<template>
  <div class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
    <Title as="h1">
      {{ title }}
    </Title>
    <p>
      Congratulations! You just offset <strong>{{ carbon }}</strong> kilograms of carbon!
    </p>
    <Button
      as="RouterLink"
      icon-right="arrow-right"
      :to="{ name: 'flights' }"
      class="mt-6"
    >
      Offset more flights
    </Button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head () {
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
  beforeDestroy () {
    this.$store.commit('estimate/reset')
  }
}
</script>
