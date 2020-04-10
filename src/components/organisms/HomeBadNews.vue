<template>
  <div
    id="badnews"
    class="relative min-h-screen flex flex-col justify-between items-center badnews"
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
          src="../../assets/img/home-aircraft.svg"
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
        to="#goodnews"
      />
    </div>
  </div>
</template>

<script>
import SectionCredits from '@/components/molecules/SectionCredits'

export default {
  components: {
    SectionCredits
  }
}
</script>

<style scoped>
.badnews {
  background: linear-gradient(141deg, theme('colors.gray.300'), theme('colors.gray.100') 70%, theme('colors.white'))
}
</style>
