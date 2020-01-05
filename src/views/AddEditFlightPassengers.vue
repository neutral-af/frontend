<template>
  <div>
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
        :value="value"
        min="1"
        max="8"
        required
        @input="update($event)"
      />
    </Field>
    <div class="has-text-centered">
      <RoundedButton
        type="is-primary"
        size="is-large"
        inverted
        outlined
        icon-left="check"
        @click="save"
      >
        Confirm
      </RoundedButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
    value () {
      return this.flight.passengers
    },
    parent () {
      return this.$route.matched[this.$route.matched.length - 2].name
    }
  },
  methods: {
    ...mapMutations('estimateForm', {
      addFlight: 'addFlight',
      resetNewFlight: 'resetNewFlight',
      updateFlight: 'updateFlight',
      updateNewFlight: 'updateNewFlight'
    }),
    update (value) {
      const data = { passengers: value }
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

<style lang="scss">
.add-edit-flight-passengers {
  input[type="number"] {
    width: 2em;
  }
}
</style>
