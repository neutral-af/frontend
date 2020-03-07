<template>
  <form
    novalidate
    autocomplete="off"
    class="max-w-md"
    @submit.prevent="onSubmit"
  >
    <Title as="h1">
      {{ title }}
    </Title>
    <Actions
      v-if="mode === 'add'"
      class="mb-6"
    >
      <Button
        slot="left"
        size="lg"
        icon-left="map-marker-alt"
        :active="flight.type === 'locations'"
        @click="update('type', 'locations')"
      >
        Departure+Arrival
      </Button>
      <Button
        slot="right"
        size="lg"
        icon-left="ticket-alt"
        :active="flight.type === 'number'"
        @click="update('type', 'number')"
      >
        Flight Number
      </Button>
    </Actions>
    <template v-if="flight.type">
      <template v-if="flight.type === 'locations'">
        <AirportField
          id="departure"
          label="Departure Airport"
          label-icon-left="plane-departure"
          placeholder="e.g. Milan, Malpensa or MXP"
          :value="flight.departure"
          :autofocus="true"
          @input="update('departure', $event)"
        />
        <AirportField
          id="arrival"
          label="Arrival Airport"
          label-icon-left="plane-arrival"
          placeholder="e.g. Toronto, Pearson or YYZ"
          :value="flight.arrival"
          @input="update('arrival', $event)"
        />
      </template>
      <template v-if="flight.type === 'number'">
        <Field
          id="flight-number"
          label="Flight Number"
          label-icon-left="ticket-alt"
        >
          <Input
            id="flight-number"
            placeholder="e.g. AC895"
            required
            :value="flight.flightNumber"
            @input="update('flightNumber', $event)"
          />
        </Field>
        <Field
          id="date"
          label="Date"
          label-icon-left="calendar-alt"
        >
          <DatePicker
            id="date"
            placeholder="Date"
            :value="formattedDate"
            required
            readonly
            :min-date="minDate"
            @input="update('date', $event)"
          />
        </Field>
      </template>
      <Field
        id="passengers"
        label="Passengers"
        label-icon-left="user"
      >
        <NumberInput
          id="passengers"
          :value="flight.passengers"
          min="1"
          max="8"
          required
          @input="update('passengers', $event)"
        />
      </Field>
      <div class="mt-6">
        <Button
          size="lg"
          type="submit"
          icon-left="check"
          :disabled="!valid"
        >
          Confirm
        </Button>
      </div>
    </template>
  </form>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { DateTime } from 'luxon'

import { date as formatDate } from '@/utils/formatters'
import { isValidFlight } from '@/utils/validators'
import Actions from '@/components/atoms/Actions'
import AirportField from '@/components/molecules/AirportField'

const PAST_DAYS = 7

export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    Actions,
    AirportField
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('estimateForm', ['newFlight']),
    ...mapGetters('estimateForm', ['flightsCount']),
    mode () {
      return this.id ? 'edit' : 'add'
    },
    flight () {
      return this.mode === 'edit'
        ? this.$store.getters['estimateForm/flightById'](this.id)
        : this.newFlight
    },
    formattedDate () {
      return formatDate(this.flight.date)
    },
    minDate () {
      return DateTime.local().minus({ hours: 24 * PAST_DAYS }).toJSDate()
    },
    valid () {
      return isValidFlight(this.flight)
    },
    title () {
      if (this.mode === 'edit') {
        return 'Edit flight'
      }
      if (this.flightsCount === 0) {
        return 'Add your first flight'
      }
      return 'Add a flight'
    }
  },
  created () {
    if (!this.flight) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
    }
  },
  methods: {
    ...mapMutations('estimateForm', {
      addFlight: 'addFlight',
      resetNewFlight: 'resetNewFlight',
      updateFlight: 'updateFlight',
      updateNewFlight: 'updateNewFlight'
    }),
    update (key, value) {
      const data = { [key]: value }
      if (this.mode === 'edit') {
        this.updateFlight({ id: this.id, data })
      } else {
        this.updateNewFlight(data)
      }
    },
    onSubmit () {
      if (!this.valid) {
        return
      }
      if (this.mode === 'add') {
        this.addFlight(this.flight)
        this.resetNewFlight()
      }
      this.$router.push({ name: 'flights', query: this.$route.query })
    }
  }
}
</script>
