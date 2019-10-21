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
        tag="router-link"
        :to="{ name: 'estimate-edit-flight', params: { id } }"
        type="is-dark"
        outlined
        inverted
        title="Edit"
        icon-right="pen"
      />
      &nbsp;
      <RoundedButton
        v-if="removable"
        type="is-dark"
        outlined
        inverted
        title="Remove"
        icon-right="trash"
        @click="remove"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import { formatAirport } from '@/utils'

export default {
  props: {
    id: {
      type: String,
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
    },
    removable: {
      type: Boolean,
      default: false
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
  methods: mapMutations('estimateForm', { remove: 'removeFlight' })
}
</script>
