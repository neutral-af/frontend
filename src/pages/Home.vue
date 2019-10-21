<template>
  <Layout class="home">
    <Hero>
      <h1>
        <div class="title">
          Fly Neutral
        </div>
        <div class="subtitle">
          (as f**k)
        </div>
      </h1>
      <BButton
        tag="router-link"
        size="is-medium"
        type="is-primary"
        inverted
        icon-right="arrow-right"
        rounded
        :to="{ name: 'estimate' }"
      >
        Offset a flight now
      </BButton>
      <BButton
        slot="bottom"
        size="is-medium"
        type="is-primary"
        inverted
        outlined
        rounded
        icon-right="arrow-down"
        @click="scrollViewport('badnews')"
      />
    </Hero>
    <div ref="badnews">
      <ViewportSection>
        <div class="columns">
          <div class="column is-1" />
          <div class="column is-half has-text-justified">
            <h1 class="has-text-grey-dark is-size-2">
              Flying is one of the worst carbon-polluting things you do.
            </h1>
            <div class="is-size-4">
              <p>The International Council on Clean Transportation says "the climate challenge for aviation is worse than anyone expected."</p>
              <p>A <span class="has-text-weight-bold">single seat</span> on a New York to London flight puts more than <span class="has-text-weight-bold">a thousand kilograms</span> (one whole tonne) of CO2 into the air. And it hurts the Earth even more when the CO2 is emitted at that elevation.</p>
              <p>You know you should probably take a train. Or a boat. But sometimes you have to fly.</p>
            </div>
          </div>
          <div class="column is-1" />
          <div class="column is-2 is-centered">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/49/Airport_symbol.svg"
              class="airport-image"
            >
          </div>
        </div>
        <BButton
          slot="bottom"
          size="is-medium"
          type="is-primary"
          inverted
          outlined
          rounded
          icon-right="arrow-down"
          @click="scrollViewport('goodnews')"
        />
      </ViewportSection>
    </div>
    <div ref="goodnews">
      <ViewportSection>
        <div class="columns">
          <div class="column is-1" />
          <div class="column is-one-third">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Circle-icons-takeoff.svg"
              class="airport-image"
            >
          </div>
          <div class="column is-2" />
          <div class="column is-two-thirds">
            <h1 class="has-text-grey-dark is-size-2">
              Living carbon neutral is really f**king hard.
            </h1>
            <div class="is-size-4">
              <p>Luckily, flying neutral is <span class="has-text-weight-bold">easy a. f.</span></p>
              <p> New York to London flight costs as little as <span class="has-text-weight-bold">$2.50</span> to offset, and you can do it in less than a minute.</p>
              <p>Plus, you’ll be supporting renewable energy, reforestation, and other climate-protecting initiatives.</p>
            </div>
            <br>
            <BButton
              tag="router-link"
              size="is-medium"
              type="is-primary"
              inverted
              rounded
              :to="{ name: 'estimate' }"
            >
              <span>Offset a flight now</span><i class="fas cta-icon fa-arrow-right" />
            </BButton>
          </div>
        </div>
      </ViewportSection>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/layouts/Content'
import Hero from '@/components/organisms/Hero'
import ViewportSection from '@/components/organisms/ViewportSection'

export default {
  components: {
    Hero,
    Layout,
    ViewportSection
  },
  methods: {
    scrollViewport (ref) {
      this.$refs[ref].scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: $family-secondary;
  font-size: 4em;
}
.subtitle {
  font-family: $family-secondary;
  font-size: 2em;
}
.cta-icon{
  padding-left: 5px;
}
.airport-image{
  width: 100%;
  filter: gray;
  -webkit-filter: grayscale(100%);
}
</style>
