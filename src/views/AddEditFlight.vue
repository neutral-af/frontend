<template>
  <div
    v-if="flight"
    class="add-edit-flight"
  >
    <RouterView />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
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
    }
  },
  created () {
    if (!this.flight) {
      this.$router.replace({ name: 'flights', query: this.$route.query })
      return
    }
    if (this.$route.name === 'add-flight') {
      this.$router.replace({ name: `${this.$route.name}-type` })
      return
    }
    if (this.$route.name === 'edit-flight') {
      const name = `${this.$route.name}-${this.flight.type === 'locations' ? 'departure' : 'number'}`
      this.$router.replace({ name })
    }
  }
}
</script>
