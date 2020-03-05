<template>
  <div class="level is-mobile estimate-flight">
    <template v-if="type === 'locations'">
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
    </template>
    <template v-else>
      <BTooltip
        class="level-item"
        label="Flight number"
        type="is-light"
      >
        <BIcon
          icon="ticket-alt"
          size="is-small"
        />
        &nbsp;
        {{ flightNumber }}
      </BTooltip>
      <BTooltip
        class="level-item"
        label="Date"
        type="is-light"
      >
        <BIcon
          icon="calendar-alt"
          size="is-small"
        />
        &nbsp;
        {{ formattedDate }}
      </BTooltip>
    </template>
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
      <Button
        as="RouterLink"
        :to="{
          name: 'edit-flight',
          params: { id },
          query: this.$route.query
        }"
        title="Edit"
        icon-right="pen"
      />
    &nbsp;
      <Button
        v-if="removable"
        title="Remove"
        icon-right="trash"
        @click="remove"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import { airport as formatAirport, date as formatDate } from '@/utils/formatters'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    departure: {
      type: Object,
      default: null
    },
    arrival: {
      type: Object,
      default: null
    },
    flightNumber: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: null
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
    },
    formattedDate () {
      return formatDate(this.date)
    }
  },
  methods: {
    ...mapMutations('estimateForm', ['removeFlight']),
    remove () {
      this.removeFlight(this.id)
    }
  }
}
</script>
