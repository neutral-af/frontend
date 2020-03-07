<template>
  <div ref="chartWrapper">
    <Title as="h1">
      Price Estimate Info
    </Title>
    <BreakdownChart
      :chart-data="breakdown"
      :options="chartOptions"
      class="mb-6"
    />
    <p>
      This breakdown shows the relative cost of your offset contribution and all fees.
    </p>
    <Button
      as="RouterLink"
      :to="{ name: 'flights', query: this.$route.query }"
      icon-left="arrow-left"
      class="mt-6"
    >
      Back to Flights
    </Button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { price as format } from '@/utils/formatters'
import BreakdownChart from '@/components/atoms/BreakdownChart'

export default {
  components: {
    BreakdownChart
  },
  computed: {
    ...mapState('estimate', ['price']),
    value () {
      return this.price.breakdown
    },
    breakdown () {
      return {
        labels: this.value.map(item => item.name),
        datasets: [{
          backgroundColor: ['green'],
          data: this.value.map(item => item.cents / 100)
        }]
      }
    },
    chartOptions () {
      return {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          duration: 2000
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const { cents, currency, name } = this.value[item.index]
              const formatted = format(cents, currency)
              return `${name}: ${formatted}`
            }
          }
        }
      }
    }
  }
}
</script>
