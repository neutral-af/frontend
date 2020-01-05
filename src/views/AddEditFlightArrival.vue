<template>
  <AirportField
    id="arrival"
    class="add-edit-flight-arrival"
    label="Arrival airport"
    placeholder="e.g. Toronto, Pearson or YYZ"
    :value="value"
    @update="update($event)"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import AirportField from '@/components/molecules/AirportField'

export default {
  components: {
    AirportField
  },
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
    value () {
      return this.flight.arrival ? this.flight.arrival.name : ''
    },
    parent () {
      return this.$route.matched[this.$route.matched.length - 2].name
    }
  },
  methods: {
    ...mapMutations('estimateForm', {
      updateFlight: 'updateFlight',
      updateNewFlight: 'updateNewFlight'
    }),
    update (value) {
      const data = { arrival: value }
      if (this.mode === 'edit') {
        this.updateFlight({ id: this.id, data })
      } else {
        this.updateNewFlight(data)
      }
      this.$router.push({ name: `${this.parent}-passengers` })
    }
  }
}
</script>
