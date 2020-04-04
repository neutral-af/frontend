<template>
  <div class="flex md:text-lg lg:text-xl justify-center items-center">
    <template v-if="type === 'locations'">
      <span
        title="Departure"
        class="p-2"
      >
        <Icon
          icon="plane-departure"
          size="xs"
          class="mr-1"
        />
        {{ formattedDeparture }}
      </span>
      <span
        title="Arrival"
        class="p-2"
      >
        <Icon
          icon="plane-arrival"
          size="xs"
          class="mr-1"
        />
        {{ formattedArrival }}
      </span>
    </template>
    <template v-if="type === 'number'">
      <span
        title="Flight Number"
        class="p-2"
      >
        <Icon
          icon="ticket-alt"
          size="xs"
          class="mr-1"
        />
        {{ flightNumber }}
      </span>
      <span
        title="Date"
        class="p-2"
      >
        <Icon
          icon="calendar-alt"
          size="xs"
          class="mr-1"
        />
        {{ formattedDate }}
      </span>
    </template>
    <span
      title="Passengers"
      class="p-2"
    >
      <Icon
        icon="user"
        size="xs"
        class="mr-1"
      />
      {{ passengers }}
    </span>
    <ButtonGroup class="ml-2">
      <Button
        as="RouterLink"
        :to="{
          name: 'edit-flight',
          params: { id },
          query: this.$route.query
        }"
        size="sm"
        title="Edit"
        icon-left="pen"
      >
        Edit
      </Button>
      <Button
        title="Add Return Flight"
        icon-left="exchange-alt"
        size="sm"
        :style="{ borderRadius: 'none' }"
        @click="addReturnFlight(id)"
      >
        Add return
      </Button>
      <Button
        v-if="removable"
        size="sm"
        title="Remove"
        icon-left="trash"
        @click="remove"
      >
        Remove
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import ButtonGroup from '@/components/organisms/ButtonGroup'
import { airport as formatAirport, date as formatDate } from '@/utils/formatters'

export default {
  components: {
    ButtonGroup
  },
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
    ...mapMutations('estimateForm', ['addReturnFlight', 'removeFlight']),
    remove () {
      this.removeFlight(this.id)
    }
  }
}
</script>
