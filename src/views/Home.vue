<template>
  <div>
    <div class="relative overflow-hidden min-h-screen text-white bg-primary-600 flex flex-col justify-between items-center section hero">
      <BackgroundPhoto class="w-screen h-screen" />
      <MainHead class="z-10" />
      <div
        class="container text-center z-10"
        style="margin-top: -30vh"
      >
        <p class="font-brand text-4xl leading-tight mb-4 md:text-5xl lg:text-6xl">
          <span class="block sm:inline text-6xl md:text-7xl lg:text-8xl">
            <span>{{ verb }}</span> Neutral
          </span>
          (as f**k)
        </p>
        <Button
          as="RouterLink"
          size="xl"
          color="invert"
          icon-right="arrow-right"
          :to="{ name: 'flights' }"
        >
          Offset a flight now
        </Button>
      </div>
      <div class="mb-4 z-10">
        <ScrollButton
          title="Know more"
          color="invert"
          @click="scrollTo('badnews')"
        />
      </div>
    </div>
    <main>
      <div
        ref="badnews"
        class="relative min-h-screen flex flex-col justify-between items-center section badnews"
      >
        <div class="flex-grow container py-6 px-4 md:flex md:justify-center md:items-center">
          <div class="mb-6 md:mb-0 md:mr-10 lg:mr-16 lg:max-w-2xl">
            <h2 class="text-2xl tracking-tight leading-tight mb-4 md:text-3xl lg:text-4xl">
              Flying is one of the worst carbon-polluting things you do
            </h2>
            <p>
              The International Council on Clean Transportation <LLink
                href="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html"
                noreferrer
                target="_blank"
              >
                says
              </LLink>:
            </p>
            <blockquote
              class="inline-block text-gray-600 pl-6 mb-2 sm:mb-3"
              cite="https://www.nytimes.com/2019/09/19/climate/air-travel-emissions.html"
            >
              “The climate challenge for aviation is worse than anyone expected”.
            </blockquote>
            <p class="mb-2 sm:mb-3">
              A <strong>single seat</strong> on a New York to London flight puts more than
              <strong>a thousand kilograms</strong> (one tonne) of CO<sub>2</sub>
              into the air. Emitting CO<sub>2</sub> at high elevation causes still more damage.
            </p>
            <p class="mb-2 sm:mb-3">
              You know you should probably take a train. Or a boat. You know that.
            </p>
            <p>But sometimes, you have to fly.</p>
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
        <div class="mb-4">
          <ScrollButton
            title="Keep reading"
            @click="scrollTo('goodnews')"
          />
        </div>
      </div>
      <div
        ref="goodnews"
        class="relative min-h-screen flex flex-col justify-between items-center section goodnews"
      >
        <div class="flex-grow container py-6 px-4 md:flex md:justify-center md:items-center">
          <div class="flex flex-col items-center justify-center mb-6 md:mb-0 md:mr-10 lg:mr-16">
            <img
              src="../assets/img/home-wind.svg"
              class="mb-6 sm:max-w-xs md:-mt-20"
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
          <div class="lg:max-w-2xl pb-6">
            <div class="mb-6 md:mb-12">
              <Title as="h2">
                Living carbon neutral is really f**king hard
              </Title>
              <p class="mb-2 sm:mb-3">
                Luckily, flying neutral is <strong>easy af.</strong>
              </p>
              <p class="mb-2 sm:mb-3">
                A flight from New York to London can be offset for as little as <strong>{{ price }}</strong>. You’ll be supporting renewable energy, reforestation, and other climate-protecting initiatives.
              </p>
              <p>
                And you can do it in less than a minute.
              </p>
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
import { price } from '@/utils/formatters'
import ScrollButton from '@/components/molecules/ScrollButton'
import SectionCredits from '@/components/molecules/SectionCredits'
import BackgroundPhoto from '@/components/organisms/BackgroundPhoto'
import MainHead from '@/components/organisms/MainHead'
import MainFoot from '@/components/organisms/MainFoot'

const VERBS = ['Go', 'Fly', 'Drive']

export default {
  head: {
    title: NAME,
    titleTemplate: null
  },
  components: {
    BackgroundPhoto,
    MainFoot,
    MainHead,
    ScrollButton,
    SectionCredits
  },
  data () {
    return {
      verb: VERBS[0]
    }
  },
  computed: {
    price () {
      return price(250, 'USD')
    }
  },
  created () {
    this.verbInterval = setInterval(() => {
      let index = VERBS.findIndex(item => item === this.verb) + 1
      if (index >= VERBS.length) {
        index = 0
      }
      this.verb = VERBS[index]
    }, 2000)
  },
  beforeDestroy () {
    clearInterval(this.verbInterval)
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

.section {
  min-height: -webkit-fill-available;
}

.badnews {
  background: linear-gradient(141deg, var(--color-bg-gradient-start), var(--color-bg-gradient-mid) 70%, var(--color-bg-gradient-end))
}

.goodnews {
  background: linear-gradient(256deg, var(--color-bg-gradient-start), var(--color-bg-gradient-mid) 70%, var(--color-bg-gradient-end))
}
</style>
