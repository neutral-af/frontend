<template>
  <Field
    label="Date"
    label-for="date"
    autofocus
    invert
    huge
    class="add-edit-flight-date"
  >
    <BDatepicker
      id="date"
      placeholder="Date"
      :value="value"
      inline
      required
      :max-date="new Date()"
      @input="update($event)"
    />
  </Field>
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
      return this.flight.date
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
      const data = { date: value }
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

<style lang="scss">
.flight-form-field .input {
  width: 8em;
}
</style>
