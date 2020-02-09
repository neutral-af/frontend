<template>
  <div
    v-if="flight"
    class="add-edit-flight"
  >
    <Actions
      v-if="mode === 'add' && !flight.type"
      class="add-flight-type"
    >
      <RoundedButton
        slot="left"
        size="is-large"
        type="is-dark"
        icon-left="map-marker-alt"
        outlined
        inverted
        @click="update('type', 'locations')"
      >
        Departure+Arrival
      </RoundedButton>
      <RoundedButton
        slot="right"
        size="is-large"
        type="is-dark"
        icon-left="ticket-alt"
        outlined
        inverted
        @click="update('type', 'number')"
      >
        Flight Number
      </RoundedButton>
    </Actions>
    <template v-else>
      <template v-if="flight.type === 'locations'">
        <AirportField
          id="departure"
          class="add-edit-flight-departure"
          label="Departure airport"
          placeholder="e.g. Milan, Malpensa or MXP"
          :value="flight.departure"
          @input="update('departure', $event)"
        />
        <AirportField
          id="arrival"
          class="add-edit-flight-arrival"
          label="Arrival airport"
          placeholder="e.g. Toronto, Pearson or YYZ"
          :value="flight.arrival"
          @input="update('arrival', $event)"
        />
      </template>
      <template v-if="flight.type === 'number'">
        <Field
          label="Flight number"
          label-for="flight-number"
          class="add-edit-flight-number"
          autofocus
          invert
          huge
        >
          <BInput
            id="flight-number"
            placeholder="e.g. AC895"
            required
            :value="flight.flightNumber"
            @input="update('flightNumber', $event)"
          />
        </Field>
        <Field
          label="Date"
          label-for="date"
          invert
          huge
          position="is-centered"
          class="add-edit-flight-date"
        >
          <BDatepicker
            id="date"
            placeholder="Date"
            :value="flight.date"
            required
            :min-date="minDate"
            @input="update('date', $event)"
          />
        </Field>
      </template>
      <Field
        label="Passengers"
        position="is-centered"
        label-for="passengers"
        invert
        huge
        class="add-edit-flight-passengers"
      >
        <BNumberinput
          id="passengers"
          :value="flight.passengers"
          min="1"
          max="8"
          required
          @input="update('passengers', $event)"
        />
      </Field>
      <div class="has-text-centered">
        <RoundedButton
          type="is-primary"
          size="is-large"
          inverted
          outlined
          icon-left="check"
          :disabled="!valid"
          @click="save"
        >
          Confirm
        </RoundedButton>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { DateTime } from 'luxon'

import { trackEvent } from '@/tracking'
import { isValidFlight } from '@/utils/validators'
import Actions from '@/components/atoms/Actions'
import AirportField from '@/components/molecules/AirportField'

const PAST_DAYS = 7

export default {
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
    ...mapState('estimateForm', ['step', 'newFlight']),
    mode () {
      return this.id ? 'edit' : 'add'
    },
    flight () {
      return this.mode === 'edit'
        ? this.$store.getters['estimateForm/flightById'](this.id)
        : this.newFlight
    },
    minDate () {
      return DateTime.local().minus({ hours: 24 * PAST_DAYS }).toJSDate()
    },
    valid () {
      return isValidFlight(this.flight)
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
    save () {
      if (!this.valid) {
        return
      }
      if (this.mode === 'add') {
        this.addFlight(this.flight)
        this.resetNewFlight()
      }

      trackEvent('flightAdded', {})
      this.$router.push({ name: 'flights', query: this.$route.query })
    }
  }
}
</script>

<style lang="scss">
.add-edit-flight-passengers {
  .b-numberinput.field.is-grouped {
    justify-content: center;

    div.control {
      flex-grow: 0;
    }
  }

  input[type="number"] {
    width: 2em;
  }
}
</style>
