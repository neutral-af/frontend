<template>
  <div class="modal-card">
    <div
      ref="chartWrapper"
      class="modal-content modal-card-body"
    >
      <p class="title has-text-grey-dark">
        Price Breakdown
      </p>
      <BreakdownChart
        :chart-data="breakdown"
        :options="chartOptions"
      />
      <div class="has-text-grey-darker">
        This breakdown shows the relative cost of your offset contribution and all fees.
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '@/utils'
import BreakdownChart from '@/components/atoms/BreakdownChart'

export default {
  components: {
    BreakdownChart
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    breakdown () {
      return {
        labels: this.value.map(e => e.name),
        datasets: [
          {
            backgroundColor: ['green'],
            data: this.value.map(e => e.cents / 100)
          }
        ]
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
              const details = this.value[item.index]
              const formatted = formatPrice(details.cents, details.currency)
              return `${details.name}: ${formatted}`
            }
          }
        }
      }
    }
  }
}
</script>
