<template>
  <Actions class="add-flight-type">
    <RoundedButton
      slot="left"
      size="is-large"
      type="is-dark"
      icon-left="map-marker-alt"
      outlined
      inverted
      @click="update('locations')"
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
      @click="update('number')"
    >
      Flight Number
    </RoundedButton>
  </Actions>
</template>

<script>
import Actions from '@/components/atoms/Actions'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Actions
  },
  computed: {
    ...mapState('estimateForm', ['newFlight']),
    flight () {
      return this.newFlight
    },
    parent () {
      const parent = this.$route.matched[this.$route.matched.length - 2]
      return parent.name
    }
  },
  created () {
    if (this.mode === 'edit') {
      const name = `${this.$route.name}-${this.getNextRoute(this.flight.type)}`
      this.$router.replace({ name })
    }
  },
  methods: {
    ...mapMutations('estimateForm', ['updateNewFlight']),
    getNextRoute (type) {
      return type === 'locations' ? 'departure' : 'number'
    },
    update (value) {
      this.updateNewFlight({ type: value })
      this.$router.push({ name: `${this.parent}-${this.getNextRoute(value)}` })
    }
  }
}
</script>
