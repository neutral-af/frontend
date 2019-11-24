<template>
  <section class="modal-card">
    <div
      ref="chartWrapper"
      class="modal-content modal-card-body"
    >
      <h3 class="title has-text-grey-dark">
        Price Breakdown
      </h3>
      <BreakdownChart
        :chart-data="breakdown"
        :options="chartOptions"
      />
      <div class="section">
        <p class="has-text-grey-darker">
          This breakdown shows the relative cost of your offset contribution and all fees.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { price as format } from '@/utils/formatters'
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
