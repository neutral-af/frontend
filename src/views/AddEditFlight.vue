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
    <div
      v-if="flight.type"
      class="pt-6"
    >
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
          :disabled="!valid || creating"
          :loading="creating"
        >
          Confirm
        </Button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
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
    ...mapState('estimate', {
      creating: 'creating',
      flight: 'formFlight',
      flights: 'flights'
    }),
    ...mapGetters('estimate', ['flightById', 'flightsCount']),
    mode () {
      return this.id ? 'edit' : 'add'
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
    let flight
    if (this.mode === 'edit') {
      flight = this.flightById(this.id)
    }
    this.createFormFlight(flight)
    if (!this.flight) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
    }
  },
  methods: {
    ...mapMutations('estimate', [
      'createFormFlight',
      'updateFormFlight',
      'resetFormFlight'
    ]),
    ...mapActions('estimate', ['addFlight', 'editFlight']),
    ...mapActions('notifications', ['showNotification']),
    update (key, value) {
      const data = { [key]: value }
      this.updateFormFlight(data)
    },
    createId () {
      const ids = Object.keys(this.flights)
      return ids.length > 0 ? Math.max(...ids) + 1 : 1
    },
    async onSubmit () {
      if (!this.valid) {
        return
      }
      try {
        if (this.mode === 'edit') {
          const { id, flight } = this
          await this.editFlight({ id, flight })
        } else {
          await this.addFlight(this.flight)
        }
        this.$router.push({ name: 'flights', query: this.$route.query })
      } catch (err) {
        if (err.response && err.response.errors && err.response.errors.length > 0) {
          const [{ message }] = err.response.errors
          this.showNotification({ message })
        }
        if (process.env.NODE_ENV === 'development') {
          throw err
        }
      }
    }
  }
}
</script>
