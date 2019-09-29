<template>
  <div>
    <BButton
      class="field"
      rounded
      icon-right="question"
      @click="show = true"
    />
    <BModal
      :active.sync="show"
      has-modal-card
    >
      <div
        class="modal-card"
        style="width: auto"
      >
        <div
          ref="chartWrapper"
          class="modal-content modal-card-body"
        >
          <p class="title has-text-grey-dark">
            Price Breakdown
          </p>
          <BreakdownChart
            v-if="value"
            :chart-data="breakdown"
            :options="chartOptions"
          />
          <div class="has-text-grey-darker">
            This breakdown shows the relative cost of your offset contribution and all fees.
          </div>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script>
import BreakdownChart from '../atoms/BreakdownChart'
import { formatCurrencyCents } from '../../utils'

export default {
  components: {
    BreakdownChart
  },
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      show: false,
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          duration: 2000
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const details = this.value[item.index]
              const formatted = formatCurrencyCents(details.cents, details.currency)
              return `${details.name}: ${formatted}`
            }
          }
        }
      }
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
    }
  }
}
</script>
