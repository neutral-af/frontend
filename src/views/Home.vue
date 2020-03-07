<template>
  <div>
    <div class="relative overflow-hidden min-h-screen text-white bg-primary-600 flex flex-col justify-between items-center hero">
      <BackgroundPhoto />
      <MainHead class="z-10" />
      <div
        class="container text-center z-10"
        style="margin-top: -30vh"
      >
        <p class="font-brand text-4xl leading-tight mb-4 md:text-5xl lg:text-6xl">
          <span class="block sm:inline text-6xl md:text-7xl lg:text-8xl">Fly Neutral</span>
          (as f**k)
        </p>
        <Button
          as="RouterLink"
          size="lg"
          variant="solid"
          icon-right="arrow-right"
          :to="{ name: 'flights' }"
        >
          Offset a flight now
        </Button>
      </div>
      <ScrollButton
        class="z-10 mb-4"
        title="Know more"
        @click="scrollTo('badnews')"
      />
    </div>
    <main>
      <div
        ref="badnews"
        class="relative min-h-screen flex flex-col justify-between items-center"
      >
        <div class="flex-grow container py-6 px-4 md:flex md:justify-center md:items-center">
          <div class="mb-6 md:mb-0 md:mr-10 lg:mr-16 lg:max-w-xl">
            <h2 class="text-2xl tracking-tight leading-tight mb-4 md:text-3xl lg:text-4xl">
              Flying is one of the worst carbon-polluting things you do
            </h2>
            <p class="mb-2">
              The International Council on Clean Transportation <LLink
                href="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html"
                noreferrer
                target="_blank"
              >
                says
              </LLink>:
            </p>
            <blockquote
              class="italic mb-2"
              cite="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html"
            >
              “The climate challenge for aviation is worse than anyone expected”.
            </blockquote>
            <p class="mb-2">
              A <strong>single seat</strong> on a New York&rarr;London flight puts more than
              <strong>{{ co2 }}</strong> (one whole tonne) of CO<sub>2</sub>
              into the air. And it hurts the Earth even more when the CO<sub>2</sub>
              is emitted at that elevation.
            </p>
            <p>You know you should probably take a train. Or a boat. But sometimes, you have to fly.</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <img
              src="../assets/img/home-aircraft.svg"
              class="mb-4 sm:max-w-xs"
            >
            <SectionCredits class="text-gray-600">
              Illustration: <LLink
                href="https://undraw.co"
                noreferrer
                target="_blank"
              >
                unDraw
              </LLink>
            </SectionCredits>
          </div>
        </div>
        <ScrollButton
          class="mb-6"
          title="Keep reading"
          @click="scrollTo('goodnews')"
        />
      </div>
      <div
        ref="goodnews"
        class="relative min-h-screen flex flex-col justify-between items-center"
      >
        <div class="flex-grow container py-6 px-4 md:flex md:justify-center md:items-center">
          <div class="flex flex-col items-center justify-center mb-6 md:mb-0 md:mr-10 lg:mr-16">
            <img
              src="../assets/img/home-wind.svg"
              class="mb-6 sm:max-w-xs"
            >
            <SectionCredits class="text-gray-600">
              Illustration:
              <LLink
                href="https://undraw.co"
                noreferrer
                target="_blank"
              >
                unDraw
              </LLink>
            </SectionCredits>
          </div>
          <div class="lg:max-w-xl pb-6">
            <div class="mb-6">
              <Title as="h2">
                Living carbon neutral is really f**king hard
              </Title>
              <p>Luckily, flying neutral is <strong>easy a. f.</strong></p>
              <p>New York&rarr;London flight costs as little as <strong>{{ price }}</strong> to offset, and you can do it in less than a minute.</p>
              <p>Plus, you’ll be supporting renewable energy, reforestation, and other climate-protecting initiatives.</p>
            </div>
            <Button
              as="RouterLink"
              size="lg"
              icon-right="arrow-right"
              :to="{ name: 'flights' }"
            >
              Offset a flight now
            </Button>
          </div>
        </div>
      </div>
    </main>
    <MainFoot />
  </div>
</template>

<script>
import { NAME } from '@/../constants'
import { weight, price } from '@/utils/formatters'
import ScrollButton from '@/components/molecules/ScrollButton'
import SectionCredits from '@/components/molecules/SectionCredits'
import CookieNotice from '@/components/molecules/CookieNotice'
import BackgroundPhoto from '@/components/organisms/BackgroundPhoto'
import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'

export default {
  head: {
    title: NAME,
    titleTemplate: null
  },
  components: {
    BackgroundPhoto,
    CookieNotice,
    MainFoot,
    MainHead,
    ScrollButton,
    SectionCredits
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

<style>
.hero {
  background: linear-gradient(141deg, theme('colors.green.900'), theme('colors.teal.500') 70%, theme('colors.teal.300'));
}
</style>
