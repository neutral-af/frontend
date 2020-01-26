<template>
  <div>
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
        inline
        :min-date="minDate"
        @input="update('date', $event)"
      />
    </Field>
    <div class="has-text-centered">
      <Field>
        <RoundedButton
          native-type="submit"
          type="is-primary"
          size="is-medium"
          outlined
          inverted
          icon-left="check"
          @click="save"
        >
          Confirm
        </RoundedButton>
      </Field>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { DateTime } from 'luxon'

const PAST_DAYS = 7

export default {
  computed: {
    ...mapState('estimateForm', ['newFlight']),
    mode () {
      return this.id ? 'edit' : 'add'
    },
    flight () {
      return this.mode === 'edit'
        ? this.$store.getters['estimateForm/flightById'](this.id)
        : this.newFlight
    },
    parent () {
      return this.$route.matched[this.$route.matched.length - 2].name
    },
    minDate () {
      return DateTime.local().minus({ hours: 24 * PAST_DAYS }).toJSDate()
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
      if (this.mode === 'add') {
        this.addFlight(this.flight)
        this.resetNewFlight()
      }
      this.$router.push({ name: 'flights', query: this.$route.query })
    }
  }
}
</script>
