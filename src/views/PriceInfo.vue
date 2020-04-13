<template>
  <div
    v-if="price"
    ref="chartWrapper"
    class="container pb-4 sm:pb-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
  >
    <Title as="h1">
      Price Estimate Info
    </Title>
    <BreakdownChart
      :data="chartData"
      :options="chartOptions"
      class="mb-6"
    />
    <p>
      This breakdown shows the relative cost of your offset contribution and all fees.
    </p>
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
    breakdown () {
      return this.price.breakdown
    },
    chartData () {
      return {
        labels: this.breakdown.map(item => item.name),
        datasets: [{
          backgroundColor: ['#319795'], // primary-600
          data: this.breakdown.map(item => item.cents / 100)
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
        legend: {
          position: 'bottom',
          labels: {
            fontSize: 14,
            fontFamily: 'Nunito, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // font-sans
            fontColor: 'rgb(74, 85, 104)' // text-gray-700
          }
        },
        tooltips: {
          bodyFontSize: 14,
          bodyFontFamily: 'Nunito, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // font-sans
          // bodyFontColor: 'rgb(74, 85, 104)', // text-gray-700
          callbacks: {
            label: (item, data) => {
              const { cents, currency, name } = this.breakdown[item.index]
              const formatted = format(cents, currency)
              return `${name}: ${formatted}`
            }
          }
        }
      }
    }
  },
  created () {
    if (!this.price) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
    }
  }
}
</script>
