<template>
  <!-- <div class="home">
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
          :to="{ name: 'flights' }"
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
        class="home-scroll"
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
                  <p>
                    The International Council on Clean Transportation <a
                      href="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html"
                      noreferrer
                      target="_blank"
                    >says</a>:
                  </p>
                  <blockquote cite="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html">
                    “The climate challenge for aviation is worse than anyone expected”.
                  </blockquote>
                  <p>
                    A <strong>single seat</strong> on a New York&rarr;London flight puts more than
                    <strong>{{ co2 }}</strong> (one whole tonne) of CO<sub>2</sub>
                    into the air. And it hurts the Earth even more when the CO<sub>2</sub>
                    is emitted at that elevation.
                  </p>
                  <p>You know you should probably take a train. Or a boat. But sometimes, you have to fly.</p>
                </div>
              </div>
              <div
                class="
                  column
                  is-6-mobile
                  is-offset-3-mobile
                  is-4-tablet
                  is-offset-1-desktop
                  is-centered
                "
              >
                <img
                  src="../assets/img/home-aircraft.svg"
                  class="home-image"
                >
              </div>
            </div>
          </div>
          <ScrollButton
            slot="foot"
            size="is-medium"
            type="is-text"
            outlined
            tooltip-type="is-light"
            class="home-scroll"
            @click="scrollTo('goodnews')"
          />
          <SectionCredits side="right">
            Illustration: <a
              href="https://undraw.co"
              noreferrer
              target="_blank"
            >unDraw</a>
          </SectionCredits>
        </HeroSection>
      </div>
      <div ref="goodnews">
        <HeroSection class="is-bold">
          <div class="container">
            <div class="columns is-vcentered">
              <div
                class="
                  column
                  is-6-mobile
                  is-4-tablet
                  is-4-desktop
                  is-offset-3-mobile
                  is-offset-1-desktop
                "
              >
                <img
                  src="../assets/img/home-wind.svg"
                  class="home-image"
                >
              </div>
              <div
                class="
                  column
                  is-12-mobile
                  is-8-tablet
                  is-6-desktop
                  is-offset-1-desktop
                "
              >
                <div class="content is-medium is-inverted">
                  <h2>Living carbon neutral is really f**king hard</h2>
                  <p>Luckily, flying neutral is <strong>easy a. f.</strong></p>
                  <p>New York&rarr;London flight costs as little as <strong>{{ price }}</strong> to offset, and you can do it in less than a minute.</p>
                  <p>Plus, you’ll be supporting renewable energy, reforestation, and other climate-protecting initiatives.</p>
                </div>
                <RoundedButton
                  tag="router-link"
                  size="is-large"
                  type="is-dark"
                  outlined
                  icon-right="arrow-right"
                  :to="{ name: 'flights' }"
                >
                  Offset a flight now
                </RoundedButton>
              </div>
            </div>
          </div>
          <SectionCredits>
            Illustration:
            <a
              href="https://undraw.co"
              noreferrer
              target="_blank"
            >unDraw</a>
          </SectionCredits>
        </HeroSection>
      </div>
    </main>
    <MainFoot slot="foot" />
  </div> -->

  <div class="home">
    <div class="h-screen">
      <!-- hero -->
      <div>Test</div>
    </div>
  </div>
</template>

<script>
import { NAME } from '@/../constants'
import { weight, price } from '@/utils/formatters'
// import ScrollButton from '@/components/molecules/ScrollButton'
// import SectionCredits from '@/components/molecules/SectionCredits'
// import HeroSection from '@/components/organisms/HeroSection'
// import MainNav from '@/components/organisms/MainNav'
// import MainFoot from '@/components/organisms/MainFoot'

export default {
  head: {
    title: NAME,
    titleTemplate: null
  },
  components: {
    // ScrollButton,
    // SectionCredits,
    // HeroSection,
    // MainNav,
    // MainFoot
  },
  computed: {
    co2 () {
      return weight(1000)
    },
    price () {
      return price(250, 'USD')
    }
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
    font-size: 6em;
  }

  &-subtitle {
    font-size: 3em;
  }

  &-scroll {
    margin-bottom: 1.5rem;
  }
}
</style>
