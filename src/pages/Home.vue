<template>
  <div class="home">
    <HeroSection
      background
      class="is-primary is-bold"
    >
      <MainNav slot="head" />
      <div class="container has-text-centered">
        <h1 class="home-headline is-family-secondary">
          <div class="title home-title">
            Fly Neutral
          </div>
          <div class="subtitle home-subtitle">
            (as f**k)
          </div>
        </h1>
        <RoundedButton
          tag="router-link"
          size="is-large"
          type="is-primary"
          inverted
          icon-right="arrow-right"
          :to="{ name: 'estimate' }"
        >
          Offset a flight now
        </RoundedButton>
      </div>
      <ScrollButton
        slot="foot"
        size="is-medium"
        type="is-primary"
        inverted
        outlined
        tooltip-type="is-light"
        @click="scrollTo('badnews')"
      />
    </HeroSection>
    <main>
      <div ref="badnews">
        <HeroSection class="is-light is-bold">
          <div class="container">
            <div class="columns">
              <div
                class="
                column
                is-8-tablet
                is-6-desktop
                is-offset-1-desktop
              "
              >
                <div class="content is-medium is-inverted">
                  <h2>
                    Flying is one of the worst carbon-polluting things you do
                  </h2>
                  <p>The International Council on Clean Transportation says: “The climate challenge for aviation is worse than anyone expected”.</p>
                  <p>A <strong>single seat</strong> on a New York to London flight puts more than <strong>a thousand kilograms</strong> (one whole tonne) of CO2 into the air. And it hurts the Earth even more when the CO2 is emitted at that elevation.</p>
                  <p>You know you should probably take a train. Or a boat. But sometimes you have to fly.</p>
                </div>
              </div>
              <div
                class="
                column
                is-6-mobile
                is-offset-3-mobile
                is-4-tablet
                is-3-desktop
                is-offset-1-desktop
                is-2-widescreen
                is-centered
              "
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/49/Airport_symbol.svg"
                  class="home-image"
                >
              </div>
            </div>
          </div>
          <ScrollButton
            slot="foot"
            size="is-medium"
            type="is-dark"
            outlined
            tooltip-type="is-light"
            @click="scrollTo('goodnews')"
          />
        </HeroSection>
      </div>
      <div ref="goodnews">
        <HeroSection class="is-bold">
          <div class="container">
            <div class="columns">
              <div
                class="
              column
              is-6-mobile
              is-3-tablet
              is-3-desktop
              is-offset-3-mobile
              is-offset-1-desktop
            "
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Circle-icons-takeoff.svg"
                  class="home-image"
                >
              </div>
              <div
                class="
              column
              is-12-mobile
              is-9-tablet
              is-6-desktop
              is-offset-1-desktop
            "
              >
                <div class="content is-medium is-inverted">
                  <h2>
                    Living carbon neutral is really f**king hard.
                  </h2>
                  <p>Luckily, flying neutral is <strong>easy a. f.</strong></p>
                  <p> New York to London flight costs as little as <strong>$2.50</strong> to offset, and you can do it in less than a minute.</p>
                  <p>Plus, you’ll be supporting renewable energy, reforestation, and other climate-protecting initiatives.</p>
                </div>
                <RoundedButton
                  tag="router-link"
                  size="is-large"
                  type="is-dark"
                  outlined
                  icon-right="arrow-right"
                  :to="{ name: 'estimate' }"
                >
                  Offset a flight now
                </RoundedButton>
              </div>
            </div>
          </div>
          <MainFoot slot="foot" />
        </HeroSection>
      </div>
    </main>
  </div>
</template>

<script>
import ScrollButton from '@/components/molecules/ScrollButton'
import HeroSection from '@/components/organisms/HeroSection'
import MainNav from '@/components/organisms/MainNav'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  metaInfo: {
    title: 'Neutral (as f**k)',
    titleTemplate: null
  },
  components: {
    ScrollButton,
    HeroSection,
    MainNav,
    MainFoot
  },
  methods: {
    scrollTo (ref) {
      this.$refs[ref].scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-headline {
    margin-bottom: 1.5rem;
  }

  &-title {
    // font-family: $family-secondary;
    font-size: 6em;
  }

  &-subtitle {
    // font-family: $family-secondary;
    font-size: 3em;
  }

  &-image {
    width: 100%;
    filter: grayscale(100%);
    opacity: .75;
  }
}
</style>
