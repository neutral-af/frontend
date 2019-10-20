<template>
  <div class="level is-mobile estimate-flight">
    <BTooltip
      class="level-item"
      label="Departure"
      type="is-light"
    >
      <BIcon
        icon="plane-departure"
        size="is-small"
      />
      &nbsp;
      {{ formattedDeparture }}
    </BTooltip>
    <BTooltip
      class="level-item"
      label="Arrival"
      type="is-light"
    >
      <BIcon
        icon="plane-arrival"
        size="is-small"
      />
      &nbsp;
      {{ formattedArrival }}
    </BTooltip>
    <BTooltip
      class="level-item"
      label="Passengers"
      type="is-light"
    >
      <BIcon
        icon="user"
        size="is-small"
      />
      &nbsp;
      {{ passengers }}
    </BTooltip>
    <div class="level-item">
      <RoundedButton
        type="is-dark"
        outlined
        inverted
        title="Edit"
        icon-right="pen"
        @click="edit"
      />
    </div>
  </div>
</template>

<script>
import { formatAirport } from '@/utils'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    departure: {
      type: Object,
      required: true
    },
    arrival: {
      type: Object,
      required: true
    },
    passengers: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedDeparture () {
      return formatAirport(this.departure, 'short')
    },
    formattedArrival () {
      return formatAirport(this.arrival, 'short')
    }
  },
  methods: {
    edit () {
      this.$emit('edit', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-flight {
  &-edit {
    @extend %sr-only;
  }
}
</style>
