<template>
  <div
    id="goodnews"
    class="relative min-h-screen flex flex-col justify-between items-center goodnews"
  >
    <div class="flex-grow container py-6 px-4 md:flex md:justify-center md:items-center">
      <div class="flex flex-col items-center justify-center mb-6 md:mb-0 md:mr-10 lg:mr-16">
        <img
          src="../../assets/img/home-wind.svg"
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
</template>

<script>
import { price } from '@/utils/formatters'
import SectionCredits from '@/components/molecules/SectionCredits'

export default {
  components: {
    SectionCredits
  },
  computed: {
    price () {
      return price(250, 'USD')
    }
  }
}
</script>

<style scoped>
.goodnews {
  background: linear-gradient(256deg, theme('colors.gray.300'), theme('colors.gray.100') 70%, theme('colors.white'))
}
</style>
