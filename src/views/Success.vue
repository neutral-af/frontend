<template>
  <div class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
    <Title as="h1">
      {{ title }}
    </Title>
    <p>
      Congratulations! You just offset <strong>{{ formattedCarbon }}</strong> of carbon!
    </p>
    <Button
      as="RouterLink"
      icon-right="arrow-right"
      :to="{ name: 'add-flight' }"
      class="mt-6"
    >
      Offset more flights
    </Button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { weight } from '@/utils/formatters'

export default {
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapState('estimate', ['estimate']),
    title () {
      return 'Success!'
    },
    formattedCarbon () {
      return weight(this.estimate.carbon)
    }
  },
  beforeDestroy () {
    this.$store.commit('estimate/resetEstimate')
  }
}
</script>
