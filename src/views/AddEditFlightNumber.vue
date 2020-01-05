<template>
  <Field
    label="Flight number"
    label-for="flight-number"
    class="add-edit-flight-number"
    autofocus
    invert
    huge
  >
    <BField>
      <BInput
        id="flight-number"
        placeholder="e.g. AC895"
        required
        :value="value"
        @input="set"
      />
      <p class="control">
        <BButton
          type="is-primary"
          size="is-large"
          icon-right="arrow-right"
          @click="update"
        />
      </p>
    </BField>
  </Field>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      value: ''
    }
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
    parent () {
      return this.$route.matched[this.$route.matched.length - 2].name
    }
  },
  created () {
    console.log(this.id)
    this.set(this.flight.flightNumber)
  },
  methods: {
    ...mapMutations('estimateForm', {
      updateFlight: 'updateFlight',
      updateNewFlight: 'updateNewFlight'
    }),
    set (value) {
      this.value = value
    },
    update () {
      const data = { flightNumber: this.value }
      if (this.mode === 'edit') {
        this.updateFlight({ id: this.id, data })
      } else {
        this.updateNewFlight(data)
      }
      this.$router.push({ name: `${this.parent}-date` })
    }
  }
}
</script>
