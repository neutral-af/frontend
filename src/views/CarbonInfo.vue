<template>
  <div class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
    <Title as="h1">
      Carbon Estimate Breakdown
    </Title>
    <p>
      The estimated carbon emissions of <strong>{{ carbon }} kilograms CO<sub>2</sub></strong> is based on a flight distance of <strong>{{ km }} kilometres</strong>, incorporating a "radiative forcing factor" of <strong>1.9x</strong> to account for the increased damage of carbon released at high altitudes.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('estimate', ['carbon', 'km'])
  }
}
</script>
