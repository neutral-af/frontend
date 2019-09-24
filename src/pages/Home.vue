<template>
  <Layout class="home">
    <Hero>
      <transition name="fadeDown">
        <h1 class="title is-1">
          Neutral (as f**k)
        </h1>
      </transition>
      <p class="subtitle is-4">
        Reclaim your CO<sub>2</sub> now.
      </p>
      <BButton
        tag="router-link"
        size="is-medium"
        type="is-primary"
        inverted
        outlined
        rounded
        :to="{ name: 'estimate' }"
      >
        Start now
      </BButton>
    </Hero>
    <main>
      Test
    </main>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Content'
import Hero from '@/components/organisms/Hero'

export default {
  components: {
    Hero,
    Layout
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: $family-secondary;
}
</style>
