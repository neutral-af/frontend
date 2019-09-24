<template>
  <BCollapse :open="false">
    <div
      slot="trigger"
    >
      details
    </div>
    <div>
      <p
        v-for="el in value.breakdown"
        :key="el.name"
      >
        <b>{{ el.name }}:</b> {{ format(el.cents, el.currency) }}
      </p>
    </div>
  </BCollapse>
</template>

<script>
import { formatCurrencyCents } from '../../utils'

export default {
  components: {
  },
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  computed: {
    cents () {
      return this.value ? this.value.cents : 0
    },
    currency () {
      return this.value ? this.value.currency : this.$store.state.userCurrency
    }
  },
  methods: {
    format: formatCurrencyCents
  }
}
</script>
