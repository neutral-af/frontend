<template>
  <Layout as="main">
    <h1 class="title is-1">
      Success!
    </h1>
    <p class="subtitle is-4">
      You just offset <strong>{{ carbon }}</strong> kilograms of carbon!
    </p>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'

import Layout from '@/layouts/HeroOnly'

export default {
  components: {
    Layout
  },
  computed: {
    ...mapState('estimate', ['carbon'])
  }
}
</script>
